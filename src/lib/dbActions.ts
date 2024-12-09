'use server';

import { hash } from 'bcrypt';
import { prisma } from './prisma';
import { Appliances, Category } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeData {
  title: string;
  description: string;
  imageURL: string;
  cookTime: string;
  instructions: string;
  appliances: string[];
  ingredients: Ingredient[];
  categories: string[];
  email: string;
}

export async function addRecipe(recipeData: RecipeData) {
  try {
    console.log('Server received recipe data:', recipeData);

    // Validate categories and appliances before creating
    const validCategories = recipeData.categories.map(cat => {
      if (!Object.values(Category).includes(cat as Category)) {
        throw new Error(`Invalid category: ${cat}`);
      }
      return cat as Category;
    });

    const validAppliances = recipeData.appliances.map(app => {
      if (!Object.values(Appliances).includes(app as Appliances)) {
        throw new Error(`Invalid appliance: ${app}`);
      }
      return app as Appliances;
    });

    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        imageURL: recipeData.imageURL,
        cookTime: recipeData.cookTime,
        instructions: recipeData.instructions,
        email: recipeData.email,
        ingredients: {
          create: recipeData.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
          })),
        },
        categories: {
          create: validCategories.map((category) => ({
            category,
          })),
        },
        appliances: {
          create: validAppliances.map((appliance) => ({
            appliance,
          })),
        },
      },
    });

    

    console.log('Recipe created:', recipe);
    revalidatePath('/'); // Revalidate the home page
    redirect('/'); // Redirect to home page
  } catch (error) {
    console.error('Server error in addRecipe:', error);
    throw error;
  }
}

export async function getAllRecipes() {
  try {
    return await prisma.recipe.findMany({
      include: {
        ingredients: true,        
        categories: true,         
        appliances: true,        
        user: true,               
      },
    });
  } catch (error) {
    console.error('Failed to fetch recipes', error);
    throw error;
  }
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { firstName: string; lastName: string; email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password,
    },
  });
}