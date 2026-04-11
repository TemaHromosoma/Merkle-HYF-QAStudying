import { Page, Locator } from '@playwright/test';

export class NavigationPanel {

    readonly page: Page;

    constructor(page: Page) {

        this.page = page;
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

