'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Clock, Utensils } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  imageURL: string;
  description: string;
  cookTime: string;
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

// Recipe/test data - to be replace with links to database
/*const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Superfood Fruit Salad',
    imageUrl: '/landing-img/acai.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Hailey Smith',
    date: '10/2/2024',
  },
  {
    id: 2,
    title: 'Steak frites in your dorm',
    imageUrl: '/landing-img/steakmeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Western',
    date: '10/2/2024',
  },
  {
    id: 3,
    title: 'Fried rice with veges and eggs',
    imageUrl: '/landing-img/ricemeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Healthy',
    date: '10/2/2024',
  },
  {
    id: 4,
    title: 'Rice cooker burritos',
    imageUrl: '/landing-img/burrito.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Eastern',
    date: '10/2/2024',
  },
  {
    id: 5,
    title: 'Chicken salad and sweet potato fries',
    imageUrl: '/landing-img/loadedfries.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Healthy',
    date: '10/2/2024',
  },
  {
    id: 6,
    title: 'Panini press sandwiches',
    imageUrl: '/landing-img/sandwichmeal.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Snack',
    date: '10/2/2024',
  },
  {
    id: 7,
    title: 'Lettuce wraps',
    imageUrl: '/landing-img/lettucewrap.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Seafood',
    date: '10/2/2024',
  },
  {
    id: 8,
    title: 'Ramen soup.. in your rice cooker!',
    imageUrl: '/landing-img/pho.png',
    description: 'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ',
    author: 'Japanese',
    date: '10/2/2024',
  },
];*/

// Search bar component
const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        {/* Placeholder Text */}
        <input
          type="search"
          placeholder="Search article, news or recipe..."
          className="search-placeholder"
          required
        />

        {/* Search Button */}
        <div className="search-button">
          <span className="search-button-text">Search</span>
        </div>
      </div>
    </div>
  );
};

// Recipe card component
const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => {
  const slug = recipe.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  // Function to handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/fallback-image.png'; // Add a fallback image
    console.error(`Failed to load image for recipe: ${recipe.title}`);
  };

  // Log the image URL to debug
  console.log('Recipe image URL:', recipe.imageURL);

  return (
    <a href={`/recipes/${slug}`} className="recipe-card">
      <div className="recipe-image-container">
        <img
          src={recipe.imageURL}
          alt={recipe.title}
          className="recipe-image"
          onError={handleImageError}
          loading="lazy"
        />
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
            <span>{recipe.categories.map(cat => cat.category).join(', ')}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

// Page numbers at bottom of screen
const Pages: React.FC = () => {
  return (
    <div className="recipes-container">
      <h4 className="pages">1</h4>
      <h4 className="pages">2</h4>
      <h4 className="pages">3</h4>
      <h4 className="pages">4</h4>
      <h4 className="pages">5</h4>
      <h4 className="pages">...</h4>
    </div>
  );
};

// Main page component
/*const Recipes: React.FC = () => (
  <div className="recipe-page">
    <div className="recipe-container-header">
      <h1 className="main-header">Community Recipe Blog</h1>
      <h2 className="main-subheader">
        Level up your health and well-being with these recipes!
      </h2>
      <SearchBar />
    </div>*/

{
  /* Main Content Container */
}
//<div className="main-content">
{
  /* Recipe Grid */
}
/*<div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>

    <Pages />
  </div>
);*/

// Main Recipes component
const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          );
        }
        const data = await response.json();
        setRecipes(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes. Please try again later.');
        // Fallback data
        setRecipes([
          {
            id: 1,
            title: 'Superfood Fruit Salad',
            imageURL: '/landing-img/acai.png',
            cookTime: '15 mins',
            categories: [{ id: 1, category: 'Healthy' }],
            description: 'A healthy fruit salad',
            instructions: 'Mix all fruits together',
            ingredients: [],
            appliances: [],
            email: 'john@foo.com',
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: 'Steak frites in your dorm',
            imageURL: '/landing-img/steakmeal.png',
            cookTime: '30 mins',
            categories: [{ id: 2, category: 'Western' }],
            description: 'Classic steak and fries',
            instructions: 'Cook steak and fries',
            ingredients: [],
            appliances: [],
            email: 'john@foo.com',
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1 className="recipe-title">
          Level up your health and well being with these recipes
        </h1>
        <p className="recipe-subtitle">
          More delicious recipes for you to explore
        </p>
        <SearchBar />
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
