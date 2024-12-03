import { test, expect } from '@playwright/test';

test('Home Page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Test navigation elements
  await expect(page.getByRole('link', { name: 'Rice Cooker Recipes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();

  // Test main content elements
  await expect(page.getByRole('heading', { name: 'Featured Recipes' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'View Recipe' })).toBeVisible();

  // Test footer elements
  await expect(page.getByRole('contentinfo')).toBeVisible();
});
