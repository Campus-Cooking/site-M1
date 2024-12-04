import { test, expect } from '@playwright/test';

test('Login and Signin Pages', async ({ page }) => {
  // Test Login Page
  await page.goto('http://localhost:3000/login');
  await page.waitForLoadState('load');

  // Check for form elements
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();

  // Check for sign up section
  await expect(page.getByText(/sign up/i)).toBeVisible();
});