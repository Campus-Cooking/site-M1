import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Appliances, Category } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      title,
      description,
      imageURL,
      ingredients,
      instructions,
      categories,
      appliances,
    } = req.body;

    try {
      if (!title || !description || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const validCategories = categories.every((category: string) =>
        Object.values(Category).includes(category as Category)
      );
      const validAppliances = appliances.every((appliance: string) =>
        Object.values(Appliances).includes(appliance as Appliances)
      );
      
      if (!validCategories) {
        return res.status(400).json({ message: 'Invalid category values' });
      }
      if (!validAppliances) {
        return res.status(400).json({ message: 'Invalid appliance values' });
      }

      const userId = 1; // Replace this with code to get actual userID

      const recipe = await prisma.recipe.create({
        data: {
          title,
          description,
          imageURL,
          instructions,
          user: { connect: { id: userId } },
          ingredients: {
            create: ingredients.map((ingredient: string) => ({
              name: ingredient.trim(),
            })),
          },
          categories: {
            set: categories as Category[],
          },
          appliances: {
            set: appliances as Appliances[],
          },
        },
      });

      return res.status(200).json({ message: 'Recipe added successfully!', recipe });
    } catch (error) {
      console.error('Error adding recipe:', error);
      return res.status(500).json({ message: 'An error occurred while adding the recipe' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
