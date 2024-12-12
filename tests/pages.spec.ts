import { test, expect } from '@playwright/test';

test.describe('Component Tests', () => {
  // Navigation Tests
  test('should have working navigation links', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check navigation elements - now more specific
    await expect(page.locator('header.top-navbar')).toBeVisible();
    await expect(page.locator('header .logo')).toHaveText('Campus Cooking');
    
    // Test navigation links
    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Recipes', path: '/recipes' },
      { name: 'Contact', path: '/contact' },
      { name: 'About Us', path: '/about-us' }
    ];

    for (const link of navLinks) {
      await page.getByRole('link', { name: link.name }).first().click();
      await expect(page).toHaveURL(new RegExp(link.path));
    }
  });

  // Landing Page Tests
  test('should display landing page components correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check landing page elements - now more specific
    await expect(page.locator('.landing')).toBeVisible();
    await expect(page.locator('.hot-recipe-badge')).toBeVisible();
    // Target first recipe title specifically
    await expect(page.locator('.landing .recipe-title').first()).toBeVisible();
    await expect(page.locator('.recipe-description')).toBeVisible();
    await expect(page.locator('.view-recipe-btn')).toBeVisible();
  });

  // Recipe Page Tests
  test('should display recipes grid correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/recipes');
    
    // Check recipe page elements
    await expect(page.locator('.recipe-page')).toBeVisible();
    await expect(page.locator('.recipe-header')).toBeVisible();
    await expect(page.locator('.recipe-grid')).toBeVisible();
    
    // Check filter functionality
    await expect(page.locator('.filter-dropdown')).toHaveCount(2);
    await expect(page.locator('.search-bar')).toBeVisible();
  });

  // Contact Page Tests
  test('should display contact form correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/contact');
    
    // Check contact form elements
    await expect(page.locator('.contact-container')).toBeVisible();
    await expect(page.locator('.contact-form')).toBeVisible();
    
    // Check form fields
    const formFields = ['name', 'email', 'subject', 'message'];
    for (const field of formFields) {
      await expect(page.locator(`[name="${field}"]`)).toBeVisible();
    }
    
    await expect(page.locator('.enquiry-select')).toBeVisible();
    await expect(page.locator('.submit-button')).toBeVisible();
  });

  // Combined Login Page Test
  test('should display signin and signup forms correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // Get both auth containers
    const authContainers = page.locator('.auth-container');
    await expect(authContainers).toHaveCount(2);

    // Test Signin Form (first auth container)
    const signinSection = page.locator('.auth-section').first();
    await expect(signinSection).toBeVisible();
    await expect(signinSection.locator('.auth-title')).toHaveText('Login');
    
    // Check signin form elements
    await expect(signinSection.locator('#username')).toBeVisible();
    await expect(signinSection.locator('#password')).toBeVisible();
    await expect(signinSection.locator('button.auth-button')).toHaveText('Get Cooking');
    
    // Check signin placeholders
    await expect(signinSection.getByPlaceholder('Enter your email...')).toBeVisible();
    await expect(signinSection.getByPlaceholder('Enter your password...')).toBeVisible();

    // Test Signup Form (second auth container)
    const signupSection = page.locator('.auth-section').nth(1);
    await expect(signupSection).toBeVisible();
    await expect(signupSection.locator('.auth-title')).toHaveText('Signup');
    
    // Check signup form elements
    await expect(signupSection.locator('#firstName')).toBeVisible();
    await expect(signupSection.locator('#lastName')).toBeVisible();
    await expect(signupSection.locator('#email')).toBeVisible();
    await expect(signupSection.locator('#password')).toBeVisible();
    await expect(signupSection.locator('#confirmPassword')).toBeVisible();
    await expect(signupSection.locator('button.auth-button')).toHaveText('Get Cooking');
    
    // Check signup placeholders
    await expect(signupSection.getByPlaceholder('Enter your first name...')).toBeVisible();
    await expect(signupSection.getByPlaceholder('Enter your last name...')).toBeVisible();
    await expect(signupSection.getByPlaceholder('Your email address...')).toBeVisible();
    await expect(signupSection.getByPlaceholder('Enter password...')).toBeVisible();
    await expect(signupSection.getByPlaceholder('Confirm password...')).toBeVisible();


    // Test form validation (optional)
    await signupSection.locator('button.auth-button').click();
  });

  // Email Subscribe Tests
  test('should display and handle email subscription', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check newsletter section
    await expect(page.locator('.newsletter-section')).toBeVisible();
    await expect(page.locator('.newsletter-title')).toBeVisible();
    await expect(page.locator('.email-input')).toBeVisible();
    await expect(page.locator('.subscribe-button')).toBeVisible();
    
    // Test subscription form
    await page.locator('.email-input').fill('test@example.com');
    await page.locator('.subscribe-button').click();
    // Note: You might want to mock the API response for this test
  });

  // Footer Tests
  test('should display footer correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check footer elements
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('.footer-links')).toBeVisible();
    await expect(page.locator('.footer-social-links')).toBeVisible();
    
    // Check footer links
    const footerLinks = ['Home', 'Recipes', 'Contact', 'About us'];
    for (const link of footerLinks) {
      await expect(page.locator('.footer-links').getByText(link)).toBeVisible();
    }
  });

  // Recipe Details Test
  test('should display recipe details correctly', async ({ page }) => {
    // Create a test recipe first or use a known existing recipe
    await page.goto('http://localhost:3000/recipes');
    
    // Click on the first recipe card to view details
    await page.locator('.recipe-card').first().click();
    
    // Now check the details page
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('.recipe-meta')).toBeVisible();
    await expect(page.locator('.recipe-content')).toBeVisible();
    await expect(page.locator('.recipe-ingredients')).toBeVisible();
    await expect(page.locator('.recipe-instructions')).toBeVisible();
  });
}); 