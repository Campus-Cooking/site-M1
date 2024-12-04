import { test, expect } from '@playwright/test';

// Test for authenticated users
test.describe('Add Recipe Page - Authenticated', () => {
  test.use({ storageState: 'user-auth.json' });

  test('should show add recipe form', async ({ page }) => {
    await page.goto('http://localhost:3000/addrecipe');
    await page.waitForLoadState('load');

    // Debug: Log all headings
    const headings = await page.getByRole('heading').all();
    console.log('Available headings:');
    for (const heading of headings) {
      console.log(await heading.textContent());
    }

    // Form elements with more flexible selectors
    await expect(page.getByLabel(/title/i)).toBeVisible();
    await expect(page.getByLabel(/description/i)).toBeVisible();
    await expect(page.getByLabel(/ingredients/i)).toBeVisible();
    await expect(page.getByLabel(/instructions/i)).toBeVisible();
    await expect(page.getByLabel(/cooking time/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();

    // Test form submission
    await page.getByLabel(/title/i).fill('Test Recipe');
    await page.getByLabel(/description/i).fill('Test Description');
    await page.getByLabel(/ingredients/i).fill('Ingredient 1\nIngredient 2');
    await page.getByLabel(/instructions/i).fill('Step 1\nStep 2');
    await page.getByLabel(/cooking time/i).fill('30 minutes');

    await page.getByRole('button', { name: /submit/i }).click();
  });
});

// Test for unauthenticated users
test('Unauthorized Access', async ({ page }) => {
  await page.goto('http://localhost:3000/addrecipe');
  await page.waitForLoadState('load');

  // Should be redirected to login
  await expect(page.url()).toContain('/login');
});