import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductsPage';

test.describe('Product list and details tests', () => {

    let mainPage: MainPage;

    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {

        mainPage = new MainPage(page);    

        productPage = new ProductPage(page);

        await mainPage.goto();
    });

    test('Verify product data and details are visible', async ({ page }) => {

        const productsAmount = await mainPage.getProductsCount();

        for (let i = 0; i < productsAmount; i++) {

            const productName = await mainPage.getProductName(i);

            const currentProduct = mainPage.getProductByIndex(i);
    
            await expect(currentProduct).toBeVisible();

            await currentProduct.click();

            await expect(page).toHaveURL(`${productPage.baseURL}product/${i + 1}`);

            await productPage.verifyProductDetails(productName);

            await page.goBack();         
        };
    });
});

