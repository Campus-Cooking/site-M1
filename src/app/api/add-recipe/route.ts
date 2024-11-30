import { PrismaClient, Role, Appliances, Category } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      imageURL,
      ingredients,
      instructions,
      categories,
      appliances,
      owner,
      userID,
    } = body;

    if (!title || !description || !ingredients || !instructions || !owner) {
      return new Response('Missing required fields', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: owner }, 
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    console.log("User found:", user);

    const ingredientIDs = await Promise.all(
      ingredients.map(async (ingredient: string) => {
        const existingIngredient = await prisma.ingredient.findUnique({
          where: { name: ingredient },
        });

        if (!existingIngredient) {
          const newIngredient = await prisma.ingredient.create({
            data: { name: ingredient },
          });
          console.log("Created new ingredient:", newIngredient);
          return newIngredient.id;
        }

        return existingIngredient.id;
      })
    );

    const applianceValues = appliances.map((appliance: string) => Appliances[appliance as keyof typeof Appliances]);
    const categoryValues = categories.map((category: string) => Category[category as keyof typeof Category]);

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        imageURL,
        instructions,
        owner,
        user: { connect: { id: user.id } },
        ingredients: {
          connect: ingredients.map((ingredient: string) => ({
            name: ingredient,
          })),
        },
        appliances: {
          set: applianceValues,
        },
        categories: {
          set: categoryValues,
        },
      },
    });

    console.log("Recipe created:", recipe);
    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating recipe:', error.message);
      return new Response(`Failed to create recipe: ${error.message}`, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return new Response('Failed to create recipe: Unknown error occurred', { status: 500 });
    }
  }
}








