'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Utensils } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Vegan',
  'Meat',
  'Dessert',
  'Chocolate',
];

const appliances = [
  'RiceCooker',
  'PaniniPress',
  'ToasterOven',
  'Toaster',
  'Microwave',
  'HotPlate',
];

interface Recipe {
  id: number;
  title: string;
  imageURL: string;
  description: string;
  instructions: string;
  cookTime: string;
  email: string;
  createdAt: string;
  categories: Array<{ category: string }>;
  appliances: Array<{ appliance: string }>;
  ingredients: Array<{ id: number; name: string; quantity: string }>;
}

// Search bar component
const SearchBar: React.FC<{
  query: string;
  onSearch: (query: string) => void;
  onReset: () => void;
}> = ({ query, onSearch, onReset }) => {
  const [localQuery, setLocalQuery] = useState(query);

  const handleSearch = () => {
    onSearch(localQuery);
  };

  const handleReset = () => {
    setLocalQuery(''); 
    onReset(); 
  };
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search recipes..."
          className="search-placeholder"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          required
        />
        
        {localQuery && (
          <div className="clear-button" onClick={onReset}>
            <span className="clear-button-text"></span>
          </div>
        )}
      </div>
    </div>
  );
};

// Recipe Card Component
const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const router = useRouter();
  const defaultImage = '/fallback-image.png';
  const [imgSrc, setImgSrc] = useState(recipe.imageURL);

  const handleClick = () => {
    const slug = recipe.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    router.push(`/recipes/${slug}`);
  };

  return (
    <div
      className="recipe-card cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div
        className="recipe-image-container"
        style={{ position: 'relative', width: '100%', height: '250px' }}
      >
        <img
          src={imgSrc || defaultImage}
          alt={recipe.title}
          className="recipe-image"
          onError={() => setImgSrc(defaultImage)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
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
            <span>{recipe.categories?.[0]?.category || 'Uncategorized'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// Main Recipes Component
const Recipes: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [originalRecipes, setOriginalRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAppliance, setSelectedAppliance] = useState<string | null>(null);

  // Fetch recipes from API
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) throw new Error('Could not fetch recipes');
      const data = await response.json();
      setRecipes(data);
      setOriginalRecipes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters based on query parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const appliance = searchParams.get('appliance');

    setSelectedCategory(category);
    setSelectedAppliance(appliance);
  }, [searchParams]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    let filteredRecipes = [...originalRecipes];
    if (selectedCategory) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.categories.some((cat) => cat.category === selectedCategory)
      );
    }
    if (selectedAppliance) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.appliances.some((app) => app.appliance === selectedAppliance)
      );
    }
    setRecipes(filteredRecipes);
  }, [selectedCategory, selectedAppliance, originalRecipes]);

  const resetFilters = () => {
    router.push('/recipes'); // Reset the URL and filters
    setQuery('');
    setSelectedCategory(null);
    setSelectedAppliance(null);
    setRecipes(originalRecipes);
  };

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1 className="recipe-title">Level Up Your Health and Well-Being With These Recipes!</h1>
        <SearchBar query={query} onSearch={setQuery} onReset={resetFilters} />
        <div className="filter-container centered-filters">
          <select
            value={selectedCategory || ''}
            onChange={(e) => {
              setSelectedCategory(e.target.value || null);
              router.push(`/recipes?category=${e.target.value}`);
            }}
            className="filter-dropdown"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedAppliance || ''}
            onChange={(e) => {
              setSelectedAppliance(e.target.value || null);
              router.push(`/recipes?appliance=${e.target.value}`);
            }}
            className="filter-dropdown"
          >
            <option value="">All Appliances</option>
            {appliances.map((appliance) => (
              <option key={appliance} value={appliance}>
                {appliance}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="recipe-grid">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <div>No recipes found.</div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
