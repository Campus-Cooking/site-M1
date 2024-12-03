import { test, expect } from '@playwright/test';

test('Login and Signin Pages', async ({ page }) => {
  // Test Login Page
  await page.goto('http://localhost:3000/login');

  // Test login form elements
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

  // Test login functionality
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Test error message for invalid credentials
  await expect(page.getByText('Invalid credentials')).toBeVisible();

  // Test Sign Up form elements
  await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  await expect(page.getByLabel('Name')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
});
