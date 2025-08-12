// tests/userManagement.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AdminPage } = require('../pages/AdminPage');

// --- Test Data ---
const adminCredentials = { username: 'Admin', password: 'admin123' };
const uniqueUsername = `testuser_${Date.now()}`;
const newUserDetails = {
    employeeName: 'spoorthi   kulkarni', // This employee must exist in the demo site
    username: uniqueUsername,
    password: 'Test@Password123!',
    userRole: 'Admin',
    status: 'Enabled'
};
const updatedUserDetails = {
    username: `${uniqueUsername}_updated`,
    userRole: 'ESS',
    status: 'Disabled'
};

// Use .serial() to ensure tests run in a specific order for the workflow
test.describe.serial('Admin User Management Workflow', () => {
    let page;
    let adminPage;

    // Before all tests, create one page, log in, and navigate to the Admin area.
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        adminPage = new AdminPage(page);

        await loginPage.goto();
        await loginPage.login(adminCredentials.username, adminCredentials.password);
        await dashboardPage.navigateToAdmin();
    });

    // Clean up by closing the page after all tests are done.
    test.afterAll(async () => {
        await page.close();
    });

    test('1. Should add a new user successfully', async () => {
        
        await page.locator('button[class="oxd-button oxd-button--medium oxd-button--secondary"]').fill(newUserDetails.username);
        await adminPage.addUser(newUserDetails);
    });

    test('2. Should find and edit the new user', async () => {
        await adminPage.searchUserByUsername(newUserDetails.username);
        // We pass the original username to find the user and the new details to update the form.
        await adminPage.editUser(newUserDetails.username, updatedUserDetails);
    });

    test('3. Should validate the updated user details', async () => {
        await adminPage.searchUserByUsername(updatedUserDetails.username);
        // For validation, we need to add the employee name which wasn't changed during the edit.
        const validationDetails = { ...updatedUserDetails, employeeName: newUserDetails.employeeName };
        await adminPage.verifyUserInTable(validationDetails);
    });

    test('4. Should delete the user', async () => {
        await adminPage.searchUserByUsername(updatedUserDetails.username);
        await adminPage.deleteUser(updatedUserDetails.username);
        
        // Verify deletion by searching again and expecting no results.
        await adminPage.searchUserByUsername(updatedUserDetails.username);
        await adminPage.verifyUserIsDeleted();
    });
});