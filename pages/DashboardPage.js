// pages/DashboardPage.js
const { expect } = require('@playwright/test');

exports.DashboardPage = class DashboardPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.adminMenuLink = page.getByRole('link', { name: 'Admin' });
    }

    async navigateToAdmin() {
        await this.adminMenuLink.click();
        // Wait for and verify navigation to the Admin page
        await expect(this.page.getByRole('heading', { name: 'User Management' })).toBeVisible();
    }
};