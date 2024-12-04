import { test, expect } from '@playwright/test';

test('Add Recipe Page - Authenticated', async ({ page }) => {
  await page.goto('http://localhost:3000/addrecipe');
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  // Test page title and subtitle
  await expect(page.getByRole('heading', { name: 'Add a recipe' })).toBeVisible();
  await expect(page.locator('.subtitle')).toBeVisible();

  // Test form structure
  await expect(page.locator('.recipe-container')).toBeVisible();
  await expect(page.locator('.form-wrapper')).toBeVisible();
  
  // Test left column
  const leftColumn = page.locator('.left-column');
  await expect(leftColumn).toBeVisible();
  await expect(leftColumn.locator('input[type="text"][placeholder="Enter a Name"]')).toBeVisible();
  await expect(leftColumn.locator('textarea[placeholder="Enter Short Description"]')).toBeVisible();

  // Test appliances section
  const appliancesSection = page.locator('.appliances-section');
  await expect(appliancesSection).toBeVisible();
  
  // Test each appliance row
  const applianceRows = [
    ['Rice Cooker', 'Panini Press'],
    ['Toaster Oven', 'Toaster'],
    ['Microwave', 'Hot Plate & Pan']
  ];

  for (const [appliance1, appliance2] of applianceRows) {
    const row = appliancesSection.locator('.appliance-row', {
      hasText: `${appliance1}${appliance2}`
    });
    await expect(row).toBeVisible();
  }

  // Test right column
  const rightColumn = page.locator('.right-column');
  await expect(rightColumn).toBeVisible();
  await expect(rightColumn.locator('.image-upload')).toBeVisible();
  await expect(rightColumn.locator('.ingredients-section textarea[placeholder="Enter Ingredients as list"]')).toBeVisible();

  // Test long description
  await expect(page.locator('textarea[placeholder="Enter Long Description"]')).toBeVisible();

  // Test submit button
  await expect(page.locator('button.submit-button')).toBeVisible();
});