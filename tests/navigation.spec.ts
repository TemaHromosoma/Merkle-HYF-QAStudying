import { test, expect } from '../fixtures/test-fixtures';
import { categories } from '../test-data/navigation-data';

test.describe('Navigation panel buttons check', () => {

    for (let i = 0; i < categories.length; i++) {

        test (`${categories[i].name} page visibility`, async ({ navigationPanel, mainPage, page }) => {

            await navigationPanel.getCategoryLinkButton(categories[i].name, categories[i].isExact).click();

            await expect (page).toHaveURL(`${mainPage.baseURL}${categories[i].partURL}`);
            
            await expect(navigationPanel.getCategoryHeading(categories[i].heading, categories[i].isExact)).toBeVisible();
        });
    };

    test.afterEach(async ({ page }, testInfo) => {

        if (testInfo.status !== testInfo.expectedStatus) {
        
            const screenshotPath = `screenshots/${testInfo.title.replace(/\s/g, '_')}_failed.png`;
            
            await page.screenshot({ path: screenshotPath, fullPage: true });
        
            console.log(`!!! Test ${testInfo.title} has failed. Screenshot is here: ${screenshotPath}`);
        }

        console.log('Test name:', test.info().title);
    });
});