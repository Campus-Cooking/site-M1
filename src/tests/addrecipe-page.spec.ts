import { test, expect } from '@playwright/test';

// Use authenticated state for this test
test.use({
  storageState: 'user-auth.json', // You'll need to create this auth state file
});

test('Add Recipe Page', async ({ page }) => {
  await page.goto('http://localhost:3000/recipes/add');

  // Test form elements
  await expect(page.getByRole('heading', { name: 'Add New Recipe' })).toBeVisible();
  await expect(page.getByLabel('Recipe Title')).toBeVisible();
  await expect(page.getByLabel('Description')).toBeVisible();
  await expect(page.getByLabel('Ingredients')).toBeVisible();
  await expect(page.getByLabel('Instructions')).toBeVisible();
  await expect(page.getByLabel('Cooking Time')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit Recipe' })).toBeVisible();

  // Test form submission
  await page.getByLabel('Recipe Title').fill('Test Recipe');
  await page.getByLabel('Description').fill('This is a test recipe description');
  await page.getByLabel('Ingredients').fill('Ingredient 1\nIngredient 2\nIngredient 3');
  await page.getByLabel('Instructions').fill('Step 1\nStep 2\nStep 3');
  await page.getByLabel('Cooking Time').fill('30 minutes');
  
  // Submit form
  await page.getByRole('button', { name: 'Submit Recipe' }).click();

  // Test successful submission
  await expect(page.getByText('Recipe added successfully')).toBeVisible();
});

// Test unauthorized access
test('Unauthorized Access to Add Recipe Page', async ({ page }) => {
  await page.goto('http://localhost:3000/recipes/add');
  
  // Should redirect to login page
  await expect(page).toHaveURL(/.*login/);
});
