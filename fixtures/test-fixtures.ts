import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { ProductPage } from '../pages/ProductPage';
import { VictimPage } from '../pages/VictimPage';
import { NavigationPanel } from '../pages/NavigationPanel';

type MyFixtures = {

    loginPage: LoginPage;

    mainPage: MainPage;

    productPage: ProductPage;

    victimPage: VictimPage;

    navigationPanel: NavigationPanel;
};

export const test = base.extend<MyFixtures>({
    
    loginPage: async ({ page }, use) => {
    
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        
        await use(loginPage);
    },

    mainPage: async ({ page }, use) => {

        const mainPage = new MainPage(page);

        await mainPage.goto();

        await use(mainPage);

    },

    productPage: async ({ page }, use) => {

        const productPage = new ProductPage(page);

        await productPage.goto();

        await use(productPage);
    },

    victimPage: async ({ page }, use) => {

        const victimPage = new VictimPage(page);

        await victimPage.goto();

        await use(victimPage);
    },

    navigationPanel: async ({ page }, use) => {

        const navigationPanel = new NavigationPanel(page);

        await use(navigationPanel);
    }
});

export { expect } from '@playwright/test';
