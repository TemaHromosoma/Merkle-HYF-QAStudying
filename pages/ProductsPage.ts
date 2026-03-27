import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {

    readonly page: Page;

    readonly baseURL: string;

    readonly productCard: Locator;

    readonly productName: Locator;

    readonly productImage: Locator;

    readonly productCategory: Locator;

    readonly productPrice: Locator;

    readonly quantity: Locator;

    readonly productQuantity: Locator

    readonly addToCardButton: Locator

    readonly productDescription: Locator;

    readonly backToStoreButton: Locator;

    constructor (page: Page) {

        this.page = page;

        this.baseURL = '/'

        this.productCard = page.locator('.product-card');

        this.productName = page.locator('.product-details-name');

        this.productImage = page.locator('.product-main-image');

        this.productCategory = page.locator('.product-category-badge');

        this.productPrice = page.locator('.product-detail-price');

        this.quantity = page.getByText('Qty:');

        this.productQuantity = page.getByRole('spinbutton', { name: 'Qty:' });

        this.addToCardButton = page.getByRole('button', { name: 'Add to Cart' });

        this.productDescription = page.locator('.product-detail-description');

        this.backToStoreButton = page.getByRole('link', { name: '← Back to Store' });
    }

    async verifyProductDetails(expectedName: string) {

        const descriptionLocator = this.productDescription;

        await expect(this.page.getByRole('heading', { name: expectedName })).toBeVisible();

        await expect(this.page.getByRole('img', { name: expectedName })).toBeVisible();

        await expect(this.productCategory).toBeVisible();

        await expect(this.productCategory).not.toBeEmpty();

        await expect(this.productPrice).toBeVisible();

        await expect(this.productPrice).not.toBeEmpty();

        await expect(this.quantity).toBeVisible();

        await expect(this.productQuantity).toBeVisible();

        await expect(this.addToCardButton).toBeVisible();

        await expect(descriptionLocator).toBeVisible();

        await expect(descriptionLocator).not.toBeEmpty();

        await expect(this.backToStoreButton).toBeVisible();

        const words = expectedName.split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, '')).filter(word => word.length > 2);

        const searchRegex = new RegExp(words.join('|'), 'i');

        const actualDescription = await descriptionLocator.textContent() || "";

        if (searchRegex.test(actualDescription)) {

            await expect(descriptionLocator).toContainText(searchRegex);
        }
        else {
            await expect(descriptionLocator).not.toBeEmpty();
        }
    }  
}