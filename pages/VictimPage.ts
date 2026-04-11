import { Page, Locator } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { resultTags } from '../test-data/results-data';

export class VictimPage {

    readonly baseURL: string;

    readonly page: Page;

    readonly allowCookies: Locator;

    constructor (page: Page) {

        this.page = page;

        this.baseURL = 'https://www.hackyourfuture.dk/';

        this.allowCookies = page.getByRole('button', { name: 'Allow all cookies' });
    }

    async goto () {

        await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded' });

        await this.allowCookies.click();
    }

    async accessibilityCheck() {

        const results = await new AxeBuilder({ page: this.page }).withTags(resultTags).analyze();

        return results;
    }
}