import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, description, prepTime, servings, costPerServing, ingredients, dietaryInfo, vendorId } = data;

    if (!title || !ingredients || !dietaryInfo || !vendorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ingredientPromises = ingredients.map((ingredient: string) =>
      prisma.ingredient.upsert({
        where: { name: ingredient },
        update: {}, 
        create: { name: ingredient },
      })
    );

    const ingredientsCreated = await Promise.all(ingredientPromises);

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        prepTime,
        servings,
        costPerServing,
        dietaryInfo: {
          set: dietaryInfo as string[],
        },
        ingredients: {
          connect: ingredientsCreated.map((ingredient) => ({
            id: ingredient.id,
          })),
        },
        vendorId,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
  }
}
