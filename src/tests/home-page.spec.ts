import { test, expect } from '@playwright/test';

test('home page content test', async ({ page }) => {
  // Navigate and wait for network to be idle
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  // Test main content headings that we know exist
  const expectedHeadings = [
    'Air Fryer Chicken',
    'Wings!',
    'Categories'
  ];

  for (const headingText of expectedHeadings) {
    await expect(
      page.getByRole('heading', { name: headingText })
    ).toBeVisible();
  }

  // Test category headings using specific class
  const categories = [
    'Breakfast',
    'Vegan',
    'Meat',
    'Dessert',
    'Lunch',
    'Chocolate'
  ];

  for (const category of categories) {
    await expect(
      page.locator(`.category-name:text("${category}")`)
    ).toBeVisible();
  }

  // Test recipe headings using specific class
  const recipes = [
    'Superfood Fruit Salad',
    'Rice cooker chicken and rice',
    'Rice cooker pasta'
  ];

  for (const recipe of recipes) {
    await expect(
      page.locator(`.grid-recipe-title:text("${recipe}")`)
    ).toBeVisible();
  }
});

// Test navigation using header links
test('navigation functionality', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Use the header navigation specifically
  const headerNav = page.locator('#basic-navbar-nav');
  
  // Click the Recipes link and verify navigation
  await headerNav.getByRole('link', { name: 'Recipes' }).click();
  await expect(page).toHaveURL('/recipes');

  // Go back to home page
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Click the Login link and verify navigation
  await headerNav.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('/login');
});

// Optional: Test footer navigation
test('footer navigation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Use the footer navigation specifically
  const footerNav = page.locator('#footer-navbar-nav');
  
  // Click the Recipes link in the footer
  await footerNav.getByRole('link', { name: 'Recipes' }).click();
  await expect(page).toHaveURL('/recipes');
});