import { test, expect } from '@playwright/test';
import { NavigationPanel } from '../pages/HomePage';
import { categories } from '../test-data/navigation-data';

test.describe('Navigation panel buttons check', () => {

    let navigationPanel: NavigationPanel;

    test.beforeEach(async ({ page }) => {

        navigationPanel = new NavigationPanel(page);

        await navigationPanel.goto();
    });

    for (let i = 0; i < categories.length; i++) {

        test (`${categories[i].name} page visibility`, async ({ page }) => {

            await navigationPanel.getCategoryLinkButton(categories[i].name, categories[i].isExact).click();

            await expect (page).toHaveURL(`${navigationPanel.baseURL}${categories[i].partURL}`);
            
            await expect(navigationPanel.getCategoryHeading(categories[i].heading, categories[i].isExact)).toBeVisible();
        });
    };

    test.afterEach(async ({ page }) => {

        console.log('Test name:', test.info().title);
    });
});