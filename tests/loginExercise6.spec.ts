import { test, expect } from '@playwright/test';
import { link } from 'fs';    
  
test('Successful login', async ({ page }) => {
  await page.goto('https://raider-test-site.onrender.com/');

  await page.getByRole('link', { name: 'Login or register' }).click();

  //await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Login name' }).fill('aguspe');

  //await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Password' }).fill('12341234');

  //await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://raider-test-site.onrender.com/index.php?rt=account/account');

  await expect(page.getByText('Welcome to your account')).toBeVisible();

  await expect(page.getByText('Welcome to your account')).toHaveText('Welcome to your account dashboard. From here you can manage your orders and account details.');

  //await page.waitForTimeout(2000);
});

test('Failed login with wrong password', async ({ page }) => {

  await page.goto('https://raider-test-site.onrender.com/');

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

  await page.goto('https://raider-test-site.onrender.com/');

  await page.getByRole('link', { name: 'Login or register' }).click();

  await page.getByRole('button', { name: 'Login' }).click();

  //await page.waitForTimeout(2000);

  const loginInput = page.getByRole('textbox', { name: 'Login name' });

  const isValueMissing = await loginInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing);

  expect(isValueMissing).toBe(true);

  //await page.waitForTimeout(5000);
});
