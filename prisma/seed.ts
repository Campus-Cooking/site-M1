import { PrismaClient, Role, Appliances, Category } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database...');

  // Create users concurrently
  const userPromises = config.defaultUsers.map(async (user) => {
    const hashedPassword = await hash(user.password, 10);
    console.log(`  Creating user: ${user.email}`);
    return prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role: user.role as Role,
      },
    });
  });
  await Promise.all(userPromises);

  // Create ingredients concurrently
  console.log('Creating ingredients...');
  const ingredientMap = new Map<string, number>();
  const ingredientPromises = config.defaultIngredients.map(async (ingredient) => {
    const createdIngredient = await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: {},
      create: {
        name: ingredient.name,
      },
    });
    ingredientMap.set(ingredient.name, createdIngredient.id);
    return createdIngredient;
  });
  await Promise.all(ingredientPromises);

  // Create recipes concurrently
  console.log('Creating recipes...');
  const recipePromises = config.defaultRecipes.map(async (recipe) => {
    console.log(`  Adding recipe: ${recipe.title}`);

    // Find the user (owner) by email
    const owner = await prisma.user.findUnique({
      where: { email: recipe.owner },
    });

    if (!owner) {
      console.error(`Owner not found: ${recipe.owner}`);
      return;
    }

    // Map ingredient names to ingredient IDs
    const ingredientIDs = recipe.ingredients
      .map((name) => ingredientMap.get(name))
      .filter((id): id is number => id !== undefined);

    await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        imageURL: recipe.imageURL,
        instructions: recipe.instructions,
        categories: recipe.categories as Category[],
        appliances: recipe.appliances as Appliances[],
        owner: recipe.owner,
        user: { connect: { id: owner.id } }, // Link recipe to user
        ingredients: {
          connect: ingredientIDs.map((id) => ({ id })),
        },
      },
    });
  });
  await Promise.all(recipePromises);

  console.log('Database seeding completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });