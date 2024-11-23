import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { title, description, ingredients, instructions } = data;

    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        instructions,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
  }
}
