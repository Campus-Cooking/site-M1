'use client';

import React, { useState } from 'react';

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categories, setCategories] = useState('');
  const [appliances, setAppliances] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/add-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageURL,
        ingredients: ingredients.split(',').map((ing) => ing.trim()),
        instructions,
        categories: categories.split(',').map((cat) => cat.trim()),
        appliances: appliances.split(',').map((app) => app.trim()),
      }),
    });

    if (response.ok) {
      setTitle('');
      setDescription('');
      setImageURL('');
      setIngredients('');
      setInstructions('');
      setCategories('');
      setAppliances('');
      alert('Recipe added successfully!');
    } else {
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categories:</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Appliances:</label>
          <input
            type="text"
            value={appliances}
            onChange={(e) => setAppliances(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
