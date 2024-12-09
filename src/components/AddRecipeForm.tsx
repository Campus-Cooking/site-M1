'use client';

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addRecipe } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddRecipeSchema } from '@/lib/validationSchemas';
import { User, Category, Appliances } from '@prisma/client';
import { useState } from 'react';

interface Ingredient {
  name: string;
  quantity: string;
}

const AddRecipeForm = ({ user }: { user: User }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);
  const { status } = useSession();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddRecipeSchema),
  });

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') redirect('/auth/signin');

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const onSubmit = async (formData: any) => {
    try {
      const recipeData = {
        ...formData,
        ingredients: ingredients.filter(ing => ing.name && ing.quantity),
        email: user.email,
        owner: user.id,
      };
      
      await addRecipe(recipeData);
      // Redirect will happen from server action
    } catch (error: unknown) {
      console.error('Error adding recipe:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      swal('Error', `Failed to add recipe: ${errorMessage}`, 'error');
    }
  };

  const VALID_CATEGORIES: Category[] = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Vegan',
    'Meat',
    'Dessert',
    'Chocolate'
  ];

  const VALID_APPLIANCES: Appliances[] = [
    'RiceCooker',
    'PaniniPress',
    'ToasterOven',
    'Toaster',
    'Microwave',
    'HotPlate'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="recipe-container">
      <h1>Add a Recipe</h1>
      <p className="subtitle">Share your creation with the community!</p>

      <div className="form-wrapper">
        <div className="left-column">
          {/* Recipe Title */}
          <div className="input-group">
            <label>Recipe Title</label>
            <input
              type="text"
              {...register('title')}
              placeholder="Enter recipe title"
            />
            {errors.title && <p className="error">{errors.title.message as string}</p>}
          </div>

          {/* Cook Time */}
          <div className="input-group">
            <label>Cook Time</label>
            <input
              type="text"
              {...register('cookTime')}
              placeholder="e.g., 15 mins"
            />
            {errors.cookTime && <p className="error">{errors.cookTime.message as string}</p>}
          </div>

          {/* Ingredients */}
          <div className="input-group">
            <label>Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                  className="ingredient-input"
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                  className="quantity-input"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="remove-ingredient"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="add-ingredient">
              Add Ingredient
            </button>
          </div>

          {/* Categories */}
          <div className="categories-section">
            <label>Categories</label>
            <div className="categories-grid">
              {VALID_CATEGORIES.map((category) => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register('categories')}
                    value={category}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Appliances */}
          <div className="appliances-section">
            <label>Required Appliances</label>
            <div className="appliances-grid">
              {VALID_APPLIANCES.map((appliance) => (
                <label key={appliance} className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register('appliances')}
                    value={appliance}
                  />
                  {appliance.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="right-column">
          {/* Image URL */}
          <div className="input-group">
            <label>Recipe Image URL</label>
            <input
              type="text"
              {...register('imageURL')}
              placeholder="Enter image URL"
            />
            {errors.imageURL && <p className="error">{errors.imageURL.message as string}</p>}
          </div>

          {/* Description */}
          <div className="input-group">
            <label>Description</label>
            <textarea
              {...register('description')}
              placeholder="Enter recipe description"
            />
            {errors.description && <p className="error">{errors.description.message as string}</p>}
          </div>

          {/* Instructions */}
          <div className="input-group">
            <label>Instructions</label>
            <textarea
              {...register('instructions')}
              placeholder="Enter step-by-step instructions"
              className="long-description"
            />
            {errors.instructions && <p className="error">{errors.instructions.message as string}</p>}
          </div>
        </div>
      </div>

      <button type="submit" className="submit-button">
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
