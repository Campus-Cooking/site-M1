import { test, expect } from '@playwright/test';

// Use authenticated state for this test
test.use({
  storageState: 'user-auth.json',
});

test('Add Recipe Page', async ({ page }) => {
  // Navigate to the add recipe page
  await page.goto('http://localhost:3000/recipes/add');

  // Wait for the page to fully load
  await page.waitForLoadState('load');  // Ensure the page is fully loaded

  // Ensure the "Add a Recipe" heading is visible
  await expect(page.getByRole('heading', { name: 'Add a Recipe' })).toBeVisible();

  // Test form elements
  await expect(page.getByLabel('Recipe Title')).toBeVisible();
  await expect(page.getByLabel('Description')).toBeVisible();
  await expect(page.getByLabel('Ingredients')).toBeVisible();
  await expect(page.getByLabel('Instructions')).toBeVisible();
  await expect(page.getByLabel('Cooking Time')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit Recipe' })).toBeVisible();

  // Fill out the form
  await page.getByLabel('Recipe Title').fill('Test Recipe');
  await page.getByLabel('Description').fill('This is a test recipe description');
  await page.getByLabel('Ingredients').fill('Ingredient 1\nIngredient 2\nIngredient 3');
  await page.getByLabel('Instructions').fill('Step 1\nStep 2\nStep 3');
  await page.getByLabel('Cooking Time').fill('30 minutes');

  // Submit the form
  await page.getByRole('button', { name: 'Submit Recipe' }).click();

  // Ensure success message is visible after submission
  await expect(page.getByText('Recipe added successfully')).toBeVisible();
});

// Test unauthorized access
test('Unauthorized Access to Add Recipe Page', async ({ page }) => {
  // Navigate to the add recipe page while unauthenticated
  await page.goto('http://localhost:3000/recipes/add');

  // Wait for the page to load, this may be a redirection
  await page.waitForLoadState('load');

  // Ensure the page redirects to the login page
  await expect(page).toHaveURL(/.*login/);
});
