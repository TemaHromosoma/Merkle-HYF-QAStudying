import { Page, Locator } from '@playwright/test';

export class NavigationPanel {

    readonly page: Page;

    readonly baseURL: string;

    constructor(page: Page) {

        this.page = page;

        this.baseURL = '/';
    }

    async goto() {

        await this.page.goto(this.baseURL);
    }

    getCategoryLinkButton(categoryName : string, isExact : boolean) {

        if (categoryName != 'Home') {
            return this.page.getByRole('link', { name: `${categoryName}`, exact:isExact });
        }
        else {
            return this.page.getByRole('navigation').getByRole('link', { name: `${categoryName}`, exact:isExact })
        }
    }

    getCategoryHeading(categoryHeading : string, isExact : boolean) {

        return this.page.getByRole('heading', {name: `${categoryHeading}`, exact:isExact });
    }
    
}

export class MainPage {

    readonly page: Page;

    readonly baseURL: string;

    readonly productCard: Locator;

    constructor(page: Page) {

        this.page = page;

        this.baseURL = '/';

        this.productCard = page.locator('.product-card');
    }

    async goto() {

        await this.page.goto(this.baseURL);
    }    

    async getProductName(index: number) {

        const name = await this.productCard.nth(index).locator('.product-name').textContent();

        return name ? name.trim() : '';
    }

    getProductByIndex(index: number) {

        return this.productCard.nth(index);
    }

    async getProductsCount() {

        return await this.productCard.count();
    }
}