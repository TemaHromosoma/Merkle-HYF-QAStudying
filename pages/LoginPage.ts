import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    readonly usernameInput: Locator;

    readonly passwordInput: Locator;

    readonly loginButton: Locator;

    readonly baseUrl: string;

    readonly loginAndRegisterPage: Locator;

    readonly welcomeMessage: Locator;

    readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput = page.getByRole('textbox', { name: 'Login name' });

        this.passwordInput = page.getByRole('textbox', { name: 'Password' });

        this.loginButton = page.getByRole('button', { name: 'Login' });

        this.baseUrl = '/';

        this.loginAndRegisterPage = page.getByRole('link', { name: 'Login or register' });

        this.welcomeMessage = page.getByText('Welcome to your account');

        this.errorMessage = page.locator('.alert.alert-error');
    }

    async login(username: string, password: string) {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
    
    async goto() {

        await this.page.goto(this.baseUrl);

        await this.loginAndRegisterPage.click();
    }
}