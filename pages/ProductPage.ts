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

    async verifyURL(index: number) {

        await expect(this.page).toHaveURL(new RegExp(`product/${index + 1}`));
    }

    async verifyProductDetails(expectedName: string) {

        const productPageElements = [

            this.page.getByRole('heading', { name: expectedName }),

            this.page.getByRole('img', { name: expectedName }),

            this.productCategory,

            this.productPrice,

            this.quantity,

            this.productQuantity,
            
            this.addToCardButton,

            this.productDescription,

            this.backToStoreButton
        ];

        for (let i = 0; i < productPageElements.length; i++) {

            await expect(productPageElements[i]).toBeVisible();
        }

        const words = expectedName.split(' ').map(word => word.replace(/[^a-zA-Z0-9]/g, '')).filter(word => word.length > 2);

        const searchRegex = new RegExp(words.join('|'), 'i');

        const actualDescription = await this.productDescription.textContent() || "";

        if (searchRegex.test(actualDescription)) {

            await expect(this.productDescription).toContainText(searchRegex);
        }
        else {
            await expect(this.productDescription).not.toBeEmpty();
        }
    };
    
    async goto() {

        await this.page.goto(this.baseURL);
    }
}