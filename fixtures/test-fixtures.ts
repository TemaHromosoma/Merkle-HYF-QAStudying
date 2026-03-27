import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/HomePage';

type MyFixtures = {

    loginPage: LoginPage;

    mainPage: MainPage;
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

    }
});

export { expect } from '@playwright/test';
