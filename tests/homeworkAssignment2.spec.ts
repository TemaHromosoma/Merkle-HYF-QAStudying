import { test, expect } from '@playwright/test';
import { link } from 'fs'; 

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