import { test, expect } from '@playwright/test';
import { link } from 'fs';    
  
test('Successful login', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Login or register' }).click();

  //await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Login name' }).fill('aguspe');

  //await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Password' }).fill('12341234');

  //await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/index.php?rt=account/account');

  await expect(page.getByText('Welcome to your account')).toBeVisible();

  await expect(page.getByText('Welcome to your account')).toHaveText('Welcome to your account dashboard. From here you can manage your orders and account details.');

  //await page.waitForTimeout(2000);
});

test('Failed login with wrong password', async ({ page }) => {

  await page.goto('/');

  await page.getByRole('link', { name: 'Login or register' }).click();

  //await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Login name' }).fill('aguspe');

  //await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');

  //await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Login' }).click();

  //await page.waitForTimeout(2000);

  await expect(page.getByText('Error: Incorrect login or')).toBeVisible();

  await expect(page.getByText('Error: Incorrect login or')).toHaveText('Error: Incorrect login or password provided.');

  //await page.waitForTimeout(2000);
});

test('Empty form submission', async ({page}) => {

  await page.goto('/');

  await page.getByRole('link', { name: 'Login or register' }).click();

  await page.getByRole('button', { name: 'Login' }).click();

  //await page.waitForTimeout(2000);

  const loginInput = page.getByRole('textbox', { name: 'Login name' });

  const isValueMissing = await loginInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing);

  expect(isValueMissing).toBe(true);

  //await page.waitForTimeout(5000);
});

test('Product availability on main page', async ({ page }) => { 

  await page.goto('/');

  await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();

  await expect(page.getByText('Skinsheen Bronzer Stick Makeup $29.50 Add to Cart BeneFit Girl Meets Pearl')).toBeVisible();

  //await page.locator('.product-card').first().waitFor({ state: 'visible' });

  await expect(page.locator('.product-card').first()).toBeVisible();

  //await page.waitForTimeout(2000);
});

test('Click a product and verify detail page loads', async ({ page }) => {

  await page.goto('/');

  const productName = await page.locator('.product-name').first().textContent();

  console.log('Product Name:', productName);

  await page.locator('.product-card').first().click();

  await expect(page.getByText('← Back to Store Skinsheen')).toBeVisible();

  await expect(page.locator('.product-detail-image')).toBeVisible();

  await expect(page.locator('.product-detail-name')).toBeVisible();

  await expect(page.locator('span')).toBeVisible();

  await expect(page.getByText('$')).toBeVisible();

  await expect(page.locator('.product-detail-description')).toBeVisible();

  await expect(page.getByText('Qty:')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();

  await expect(page.getByRole('spinbutton', { name: 'Qty:' })).toBeVisible();

  await expect(page).toHaveURL(/\/product\/\d+|[a-z-]+/);

  await expect(page.locator('.product-detail-name')).toHaveText(productName || '');

  //await page.waitForTimeout(2000);
});

test('Visiting every page through navigation panel', async ({ page }) => {

  await page.goto('/');

  await page.getByRole('link', { name: 'Apparel & Accessories' }).click();

  await expect(page).toHaveURL('/?category=Apparel');

  await expect(page.getByRole('heading', { name: 'Apparel' })).toBeVisible();

  await page.getByRole('link', { name: 'Makeup', exact: true }).click();

  await expect(page).toHaveURL('/?category=Makeup');

  await expect(page.getByRole('heading', { name: 'Makeup' })).toBeVisible();

  await page.getByRole('link', { name: 'Skincare', exact: true }).click();

  await expect(page).toHaveURL('/?category=Skincare');

  await expect(page.getByRole('heading', { name: 'Skincare' })).toBeVisible();

  await page.getByRole('link', { name: 'Fragrance', exact: true }).click();

  await expect(page).toHaveURL('/?category=Fragrance');

  await expect(page.getByRole('heading', { name: 'Fragrance' })).toBeVisible();

  await page.getByRole('link', { name: 'Men', exact: true }).click();

  await expect(page).toHaveURL('/?category=Men');

  await expect(page.getByRole('heading', { name: 'Men', exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'Hair Care', exact: true }).click();

  await expect(page).toHaveURL('/?category=Hair Care');

  await expect(page.getByRole('heading', { name: 'Hair Care' })).toBeVisible();

  await page.getByRole('link', { name: 'Books', exact: true }).click();

  await expect(page).toHaveURL('/?category=Books');

  await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();

  await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();

  await expect(page).toHaveURL('/');

  await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();

  //await page.waitForTimeout(2000);
});