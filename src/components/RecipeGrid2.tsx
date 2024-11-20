/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  cookTime: string;
  category: string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Superfood Fruit Salad',
    imageUrl: '/landing-img/acai.png',
    cookTime: '30 Minutes',
    category: 'Healthy',
  },
  {
    id: 2,
    title: 'Steak frites in your dorm',
    imageUrl: '/landing-img/steakmeal.png',
    cookTime: '30 Minutes',
    category: 'Western',
  },
  {
    id: 3,
    title: 'Fried rice with veges and eggs',
    imageUrl: '/landing-img/ricemeal.png',
    cookTime: '30 Minutes',
    category: 'Healthy',
  },
  {
    id: 4,
    title: 'Rice cooker burritos',
    imageUrl: '/landing-img/burrito.png',
    cookTime: '30 Minutes',
    category: 'Eastern',
  },
  {
    id: 5,
    title: 'Chicken salad and sweet potato fries',
    imageUrl: '/landing-img/loadedfries.png',
    cookTime: '30 Minutes',
    category: 'Healthy',
  },
  {
    id: 6,
    title: 'Panini press sandwiches',
    imageUrl: '/landing-img/sandwichmeal.png',
    cookTime: '30 Minutes',
    category: 'Snack',
  },
  {
    id: 7,
    title: 'Lettuce wraps',
    imageUrl: '/landing-img/lettucewrap.png',
    cookTime: '30 Minutes',
    category: 'Seafood',
  },
  {
    id: 8,
    title: 'Ramen soup.. in your rice cooker!',
    imageUrl: '/landing-img/pho.png',
    cookTime: '30 Minutes',
    category: 'Japanese',
  },
];

const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => (
  <div className="recipe-card">
    <div className="recipe-image-container">
      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      <button aria-label="Like" className="d-none d-md-block">
        <Heart />
      </button>
    </div>
    <div className="recipe-content">
      <h3 className="recipe-name">{recipe.title}</h3>
      <div className="recipe-meta">
        <div className="meta-item">
          <Clock />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="meta-item">
          <Utensils />
          <span>{recipe.category}</span>
        </div>
      </div>
    </div>
  </div>
);

const RecipeGrid2: React.FC = () => (
  <div className="recipe-page">
    <div className="recipe-header">
      <h1 className="recipe-title">Level up your health and well being with these recipes</h1>
      <p className="recipe-subtitle">More delicious recipes for you to explore</p>
    </div>

    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  </div>
);

export default RecipeGrid2;
