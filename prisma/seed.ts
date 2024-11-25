import { PrismaClient, Role, Appliances, Category } from '@prisma/client';
import { hash } from 'bcrypt';
import settings from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    // Just using this in the developement process to make it easier to work with database
    await prisma.recipe.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.user.deleteMany();

    console.log('Cleared existing data');

    // Create users
    const users = await Promise.all(
      settings.defaultUsers.map(async (user) => {
        const hashedPassword = await hash(user.password, 10);
        return prisma.user.create({
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            role: user.role as Role,
          },
        });
      }),
    );

    console.log(`Created ${users.length} users`);

    // Create ingredients
    const ingredients = await Promise.all(
      settings.defaultIngredients.map((ingredient) => prisma.ingredient.create({
        data: {
          name: ingredient.name,
        },
      })),
    );

    console.log(`Created ${ingredients.length} ingredients`);

    // Create a map of ingredient names to their IDs for easy lookup
    const ingredientMap = new Map(
      ingredients.map((ingredient) => [ingredient.name, ingredient.id]),
    );

    // Create recipes
    const recipes = await Promise.all(
      settings.defaultRecipes.map(async (recipe) => {
        // Find the first user with STUDENT role for the recipe
        const defaultAuthor = users.find((user) => user.role === 'STUDENT') || users[0];

        // Get ingredient IDs for the recipe
        const ingredientIds = recipe.ingredients
          .map((ingredientName) => ingredientMap.get(ingredientName))
          .filter((id): id is number => id !== undefined);

        return prisma.recipe.create({
          data: {
            title: recipe.title,
            description: recipe.description,
            imageURL: recipe.imageURL,
            instructions: recipe.instructions,
            categories: {
              set: recipe.categories.map((category) => category as Category),
            },
            appliances: {
              set: recipe.appliances.map((appliance) => appliance as Appliances),
            },
            ingredients: {
              connect: ingredientIds.map((id) => ({ id })),
            },
            userID: defaultAuthor.id,
          },
        });
      }),
    );

    console.log(`Created ${recipes.length} recipes`);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });