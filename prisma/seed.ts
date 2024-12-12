import { PrismaClient, Role, Appliances, Category } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

const applianceMap = {
  "ToasterOven": Appliances.ToasterOven,
  "RiceCooker": Appliances.RiceCooker,
  "PaniniPress": Appliances.PaniniPress,
  "Toaster": Appliances.Toaster,
  "Microwave": Appliances.Microwave,
  "HotPlate": Appliances.HotPlate,
};

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

  // Create recipes concurrently
  console.log('Creating recipes...');
  const recipePromises = config.defaultRecipes.map(async (recipe) => {
    console.log(`  Adding recipe: ${recipe.title}`);

    // Create the recipe
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        imageURL: recipe.imageURL,
        instructions: recipe.instructions,
        cookTime: recipe.cookTime,
        email: recipe.email,
      },
    });

    // Create ingredients for this recipe
    const ingredientPromises = recipe.ingredients.map(async (ingredient) => {
      return prisma.ingredient.create({
        data: {
          name: ingredient.name,
          quantity: ingredient.quantity,
          recipeId: createdRecipe.id,
        },
      });
    });
    await Promise.all(ingredientPromises);

    // Create categories for this recipe
    const categoryPromises = recipe.categories.map(async (category) => {
      return prisma.recipeCategory.create({
        data: {
          category: category as Category,
          recipeId: createdRecipe.id,
        },
      });
    });
    await Promise.all(categoryPromises);

    // Create appliances for this recipe (ensure enum values are used)
    const appliancePromises = recipe.appliances.map(async (appliance) => {
      let applianceEnumValue;
      switch (appliance) {
        case "ToasterOven":
          applianceEnumValue = Appliances.ToasterOven;
          break;
        case "RiceCooker":
          applianceEnumValue = Appliances.RiceCooker;
          break;
        case "PaniniPress":
          applianceEnumValue = Appliances.PaniniPress;
          break;
        case "Toaster":
          applianceEnumValue = Appliances.Toaster;
          break;
        case "Microwave":
          applianceEnumValue = Appliances.Microwave;
          break;
        case "HotPlate":
          applianceEnumValue = Appliances.HotPlate;
          break;
        default:
          throw new Error(`Unknown appliance: ${appliance}`);
      }

      return prisma.recipeAppliance.create({
        data: {
          appliance: applianceEnumValue,
          recipeId: createdRecipe.id,
        },
      });
    });
    await Promise.all(appliancePromises);
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
