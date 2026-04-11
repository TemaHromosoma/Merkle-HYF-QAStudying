import { test, expect } from '../fixtures/test-fixtures';

test.describe('Product list and details tests', () => {

    test('Verify product data and details are visible', async ({ mainPage, productPage, page }) => {

        const productsAmount = await mainPage.getProductsCount();

        for (let i = 0; i < productsAmount; i++) {

            await test.step(`Checking product ${await mainPage.getProductName(i)}`, async () => {

                const productName = await mainPage.getProductName(i);

                const currentProduct = mainPage.getProductByIndex(i);
    
                await expect(currentProduct).toBeVisible();

                await currentProduct.click();

                await expect(page).toHaveURL(`${productPage.baseURL}product/${i + 1}`);

                await productPage.verifyProductDetails(productName);

                await page.goBack();         
            });    
        };
    });
});

