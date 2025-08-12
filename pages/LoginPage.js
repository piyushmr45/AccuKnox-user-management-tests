// pages/LoginPage.js
const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // Wait for and verify navigation to the dashboard
        await expect(this.page).toHaveURL(/.*dashboard/);
    }
};