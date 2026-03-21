import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://raider-test-site.onrender.com/');
  await page.getByRole('link', { name: 'Login or register' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).fill('admin');
  await page.getByRole('textbox', { name: 'Login name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('textbox', { name: 'Login name' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).press('Shift+Home');
  await page.getByRole('textbox', { name: 'Login name' }).fill('aguspe');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('Shift+Home');
  await page.getByRole('textbox', { name: 'Password' }).fill('12341234');
  await page.getByRole('button', { name: 'Login' }).click();
});