import { test, expect } from '@playwright/test';
import { link } from 'fs'; 

test('Click a product and verify detail page loads', async ({ page }) => {

  await page.goto('/');

  const productName = await page.locator('.product-name').first().textContent();

  const productPrice = await page.locator('.product-price').first().textContent();

  const productCategory = await page.locator('.product-category').first().textContent();

  const productImage = await page.locator('.product-image').first().getAttribute('alt');

  console.log('Product Name:', productName);

  console.log('Product Price:', productPrice);

  console.log('Product Category:', productCategory);

  await page.locator('.product-card').first().click();

  await expect(page).toHaveURL(/\/product\/\d+|[a-z-]+/);

  await expect(page.locator('.product-detail-name')).toHaveText(productName || '');

  const productDetailImage = await page.locator('.product-detail-image').getAttribute('alt');

  await expect(productDetailImage).toBe(productImage);

  await expect(page.getByText('$')).toHaveText(productPrice || '');

  await expect(page.locator('span')).toHaveText(productCategory || '');

  //await page.waitForTimeout(2000);
});