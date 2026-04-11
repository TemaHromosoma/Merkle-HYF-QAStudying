import { test, expect } from '../fixtures/test-fixtures';

test.describe('Basic login functionality tests', () => {

    test('Successful login operation', async ({ loginPage, page }) => {

        await loginPage.login('aguspe', '12341234');

        await expect(page).toHaveURL(/.*account\/account/);

        await expect(loginPage.welcomeMessage).toBeVisible();

        await expect(loginPage.welcomeMessage).toContainText(/Welcome to your account/i);
    });

    test('Failed login operation with invalid password', async ({ loginPage }) => {

        await loginPage.login('aguspe', 'wrongpassword');

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toContainText(/Error: Incorrect login or password provided/i);
    });

    test('Empty username submission', async ({ loginPage }) => {

        await loginPage.login('', '12341234');

        await expect(loginPage.usernameInput).toHaveAttribute('required', '');
    });

    test('Empty password submission', async ({ loginPage }) => {

        await loginPage.login('aguspe', '');

        await expect(loginPage.passwordInput).toHaveAttribute('required', '');
    });

    test.afterEach(async ({ page }, testInfo) => {

        if (testInfo.status !== testInfo.expectedStatus) {
        
            const screenshotPath = `screenshots/${testInfo.title.replace(/\s/g, '_')}_failed.png`;

            await page.screenshot({ path: screenshotPath, fullPage: true });
        
            console.log(`!!! Test ${testInfo.title} has failed. Screenshot is here: ${screenshotPath}`);
        }
        console.log('Test name:', test.info().title);
    });
});