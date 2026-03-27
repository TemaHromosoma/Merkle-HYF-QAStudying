//import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Basic login functionality tests', () => {

    // let loginPage: LoginPage;

    // test.beforeEach(async ({ page }) => {

    //     loginPage = new LoginPage(page);

    //     await loginPage.goto();
    // });

    test('Successful login operation', async ({ loginPage, page }) => {

        await loginPage.login('aguspe', '12341234');

        await expect(page).toHaveURL('/index.php?rt=account/account');

        await expect(loginPage.welcomeMessage).toBeVisible();

        await expect(loginPage.welcomeMessage).toHaveText('Welcome to your account dashboard. From here you can manage your orders and account details.')
    });

    test('Failed login operation with invalid password', async ({ loginPage, page }) => {

        await loginPage.login('aguspe', 'wrongpassword');

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toHaveText('Error: Incorrect login or password provided.');
    });

    test('Empty username submission', async ({ loginPage, page }) => {

        await loginPage.login('', '12341234');

        await expect(loginPage.usernameInput).toHaveAttribute('required', '');
    });

    test('Empty password submission', async ({ loginPage, page }) => {

        await loginPage.login('aguspe', '');

        await expect(loginPage.passwordInput).toHaveAttribute('required', '');
    });

    test.afterEach(async ({ page }) => {

        console.log('Test name:', test.info().title);
    });
});