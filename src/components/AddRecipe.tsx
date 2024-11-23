"use client";

import React, { useState } from 'react';

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
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
          ingredients,
          instructions,
        }),
      });

      if (response.ok) {
        setMessage('Recipe added successfully!');
        setTitle('');
        setDescription('');
        setIngredients('');
        setInstructions('');
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
        <button type="submit">Add Recipe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRecipe;
