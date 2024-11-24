'use client';

import React, { useState } from 'react';

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [costPerServing, setCostPerServing] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [dietaryInfo, setDietaryInfo] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          prepTime: parseInt(prepTime, 10),
          servings: parseInt(servings, 10),
          costPerServing: parseFloat(costPerServing),
          ingredients: ingredients.split(',').map((ing) => ing.trim()),
          dietaryInfo: dietaryInfo.split(',').map((diet) => diet.trim()), 
          vendorId: parseInt(vendorId, 10),
        }),
      });

      if (response.ok) {
        setMessage('Recipe added successfully!');
        setTitle('');
        setDescription('');
        setPrepTime('');
        setServings('');
        setCostPerServing('');
        setIngredients('');
        setDietaryInfo('');
        setVendorId('');
      } else {
        setMessage('Failed to add recipe. Please try again.');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      setMessage('An error occurred. Please try again later.');
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
          />
        </div>
        <div>
          <label>Prep Time (minutes):</label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Servings:</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cost Per Serving:</label>
          <input
            type="number"
            step="0.01"
            value={costPerServing}
            onChange={(e) => setCostPerServing(e.target.value)}
            required
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
          <label>Dietary Info:</label>
          <input
            type="text"
            value={dietaryInfo}
            onChange={(e) => setDietaryInfo(e.target.value)}
          />
        </div>
        <div>
          <label>Vendor ID:</label>
          <input
            type="number"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRecipe;
