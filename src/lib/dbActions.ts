'use server';

import { prisma } from './prisma';
import { Appliances, Category } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { hashPassword } from './auth'

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
        cooktime: recipeData.cookTime,
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
 * Searches recipes in the database by a given query.
 * @param query A string to search within recipe titles.
 */
export async function searchRecipes(query: string) {
  try {
    return await prisma.recipe.findMany({
      where: {
        title: {
          contains: query, // Filter by title containing the query string
          mode: 'insensitive', // Case-insensitive search
        },
      },
      include: {
        ingredients: true,
        categories: true,
        appliances: true,
      },
    });
  } catch (error) {
    console.error('Failed to search recipes', error);
    throw error;
  }
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { firstName: string; lastName: string; email: string; password: string }) {
  const hashedPassword = await hashPassword(credentials.password);
  await prisma.user.create({
    data: {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: hashedPassword,
    },
  });
}



/**
 * Deletes a recipe and all its related records from the database.
 * @param id The ID of the recipe to delete.
 */
export async function deleteRecipe(id: number) {
  try {
    // Delete related records first
    await prisma.recipeCategory.deleteMany({
      where: { recipeId: id },
    });
    await prisma.recipeAppliance.deleteMany({
      where: { recipeId: id },
    });
    await prisma.ingredient.deleteMany({
      where: { recipeId: id },
    });

    // Then delete the recipe
    await prisma.recipe.delete({
      where: { id },
    });

    revalidatePath('/admin/monitor-recipes');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete recipe:', error);
    throw new Error('Failed to delete recipe');
  }
}

export async function updateRecipe(recipeData: RecipeData & { id: number }) {
  try {
    const { id, ...data } = recipeData;
    
    // Delete existing relations
    await prisma.recipeCategory.deleteMany({
      where: { recipeId: id },
    });
    await prisma.recipeAppliance.deleteMany({
      where: { recipeId: id },
    });
    await prisma.ingredient.deleteMany({
      where: { recipeId: id },
    });

    // Update recipe with new data
    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,
        cookTime: data.cookTime,
        instructions: data.instructions,
        ingredients: {
          create: data.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
          })),
        },
        categories: {
          create: data.categories.map((category) => ({
            category: category as Category,
          })),
        },
        appliances: {
          create: data.appliances.map((appliance) => ({
            appliance: appliance as Appliances,
          })),
        },
      },
    });

    revalidatePath('/admin/monitor-recipes');
    redirect('/admin/monitor-recipes');
  } catch (error) {
    console.error('Server error in updateRecipe:', error);
    throw error;
  }
}

export async function addEmailSubscription(email: string) {
  try {
    await prisma.emailSubscription.create({
      data: {
        email: email,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to add email subscription:', error);
    return { success: false, error: 'Failed to subscribe. Please try again.' };
  }
}