// pages/AdminPage.js

export class AdminPage {
    /*
      @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Selector for the 'Admin' link in the main navigation menu
        this.adminMenu = page.locator('a').filter({ hasText: 'Admin' });
        
        
        this.addUserButton = page.getByRole('button', { name: ' Add' });
        this.addUserHeader = page.getByRole('heading', { name: 'Add User' });
        this.editUserHeader = page.getByRole('heading', { name: 'Edit User' });
        
        this.userRoleDropdown = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-wrapper');
        this.statusDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-wrapper');
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        
        // Locator for the Username field on the Add/Edit User form
        this.usernameInput = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');

        this.passwordInput = page.locator('input[type="password"]').first();
        this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        
        
        this.usernameSearchInput = page.locator('.oxd-table-filter').locator('input').first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.recordFoundText = page.locator('span.oxd-text').filter({ hasText: '(1) Record Found' });
        this.noRecordsFoundText = page.locator('span.oxd-text').filter({ hasText: 'No Records Found' });
        this.editButton = page.getByRole('button', { name: '' });
        this.deleteButton = page.getByRole('button', { name: '' });
        
        
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.successToast = page.locator('.oxd-toast').filter({ hasText: 'Success' });
    }

    /*
      Navigates to the Admin page (User Management) by clicking the 'Admin' menu item.
     */
    async navigateToAdmin() {
        await this.adminMenu.click();
    }

    /*
      Adds a new user.
      @param {object} userData
      @param {string} userData.employeeName
      @param {string} userData.username
      @param {string} userData.password
     */
    async addUser(userData) {
        await this.addUserButton.click();
        await this.addUserHeader.waitFor({ state: 'visible' });

        await this.userRoleDropdown.waitFor({ state: 'visible' });
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: 'Admin' }).click();
        
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: 'Enabled' }).click();

        await this.employeeNameInput.fill(userData.employeeName);
        await this.page.getByRole('option', { name: userData.employeeName }).first().waitFor({ state: 'visible' });
        await this.page.getByRole('option', { name: userData.employeeName }).first().click();

        await this.usernameInput.fill(userData.username);
        await this.passwordInput.fill(userData.password);
        await this.confirmPasswordInput.fill(userData.password);
        await this.saveButton.click();
        
        await this.page.waitForURL('**/admin/viewSystemUsers');
    }

    /*
      Searches for a user by username.
      @param {string} username
     */
    async searchUser(username) {
        await this.usernameSearchInput.fill(username);
        await this.searchButton.click();
        await this.page.locator('.oxd-table-loader').waitFor({ state: 'hidden' });
    }

    /*
      Edits the status of the first user found in the search results.
      @param {string} newStatus - The new status to set (e.g., 'Disabled').
     */
    async editUserStatus(newStatus) {
        await this.editButton.first().click();
        await this.editUserHeader.waitFor({ state: 'visible' });
        
        // Change the status
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: newStatus }).click();

        await this.saveButton.click();
        await this.page.waitForURL('**/admin/viewSystemUsers');
    }

    /*
      Deletes the first user found in the search results.
     */
    async deleteUser() {
        await this.deleteButton.first().click();
        await this.confirmDeleteButton.click();
        await this.successToast.waitFor({ state: 'visible' });
    }

    /*
      Verifies that no records are found for a given username.
      @param {string} username
     */
    async verifyUserDeleted(username) {
        await this.successToast.waitFor({ state: 'hidden' });
        await this.searchUser(username);
        await this.noRecordsFoundText.waitFor({ state: 'visible' });
    }
}
