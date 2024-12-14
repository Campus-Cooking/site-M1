'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Utensils } from 'lucide-react';

interface RecipePostProps {
  slug: string;
}

interface Recipe {
  id: number;
  title: string;
  imageURL: string;
  cookTime: string;
  description: string;
  ingredients: Array<{
    id: number;
    name: string;
    quantity: string;
  }>;
  instructions: string;
  categories: Array<{
    id: number;
    category: string;
  }>;
  appliances: Array<{
    id: number;
    appliance: string;
  }>;
  email: string;
  createdAt: string;
}

const RecipePost: React.FC<RecipePostProps> = ({ slug }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${slug}`);
        if (!response.ok) {
          throw new Error('Recipe not found');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchRecipe();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <article className="recipe-post-detail">
      <div className="recipe-post-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <div className="meta-item">
            <Clock size={20} />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="meta-item">
            <Utensils size={20} />
            <span>{recipe.categories.map((c) => c.category).join(', ')}</span>
          </div>
        </div>
      </div>

      {recipe.imageURL && (
        <div className="recipe-image-container">
          <img
            src={recipe.imageURL}
            alt={recipe.title}
            className="recipe-image"
          />
        </div>
      )}

      <div className="recipe-content">
        <div className="recipe-post-description">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.quantity} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          {recipe.instructions.split('\n').map((step, index) => (
            <p key={index}>{step.trim()}</p>
          ))}
        </div>

        <div className="recipe-appliances">
          <h2>Required Appliances</h2>
          <ul>
            {recipe.appliances.map((appliance) => (
              <li key={appliance.id}>
                {appliance.appliance.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default RecipePost;
