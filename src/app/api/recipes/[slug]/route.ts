import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Convert slug back to title format (e.g., "superfood-fruit-salad" -> "Superfood Fruit Salad")
    const title = params.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const recipe = await prisma.recipe.findFirst({
      where: {
        title: title,
      },
      include: {
        ingredients: true,
        categories: true,
        appliances: true,
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 