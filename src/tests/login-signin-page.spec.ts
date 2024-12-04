import { test, expect } from '@playwright/test';

test('Login and Signin Pages', async ({ page }) => {
  // Test Login Page
  await page.goto('http://localhost:3000/login');
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');

  // Check for form elements using exact selectors from your component
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  
  // Test username input
  await expect(
    page.locator('input[id="username"][placeholder="Enter your username..."]')
  ).toBeVisible();
  
  // Test password input
  await expect(
    page.locator('input[id="password"][placeholder="Enter your password..."]')
  ).toBeVisible();

  // Test the submit button with a more unique selector combination
  await expect(
    page.locator('.auth-section')
      .filter({ hasText: 'Login' })
      .locator('button.auth-button')
      .first()
  ).toBeVisible();

  // Test for decorative images
  await expect(
    page.locator('img[src="/landing-img/cornerbowl.png"]')
  ).toBeVisible();
});

// Test sign out functionality
test('Sign Out Page', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signout');
  await page.waitForLoadState('networkidle');

  // Check for sign out elements
  await expect(page.getByRole('heading', { name: 'Sign Out' })).toBeVisible();
  await expect(
    page.getByText('Are you sure you want to leave?')
  ).toBeVisible();
  
  // Test buttons with more unique selectors
  const signOutSection = page.locator('.auth-section').filter({ hasText: 'Sign Out' });
  await expect(
    signOutSection.locator('button.auth-button').nth(0)
  ).toBeVisible();
  await expect(
    signOutSection.locator('button.auth-button').nth(1)
  ).toBeVisible();
});