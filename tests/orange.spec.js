// tests/orangehrm.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

// --- Test Data ---
const credentials = {
    username: 'Admin',
    password: 'admin123'
};

// Use a unique username for each test run
const uniqueUsername = `testuser_${Date.now()}`;

const newUserDetails = {
    employeeName: 'Virat  Kohli', // Using a known existing employee
    username: uniqueUsername,
    password: 'Test@Password123!'
};

// Data for the edit test
const updatedStatus = 'Disabled';

// Use .serial() to ensure tests run in a specific order for the workflow
test.describe.serial('OrangeHRM - Admin User Management Workflow', () => {
    let page;
    let loginPage;
    let adminPage;

    // Before all tests, create one page, log in, and navigate to the Admin area.
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);

        await loginPage.goto();
        await loginPage.login(credentials.username, credentials.password);
        await adminPage.navigateToAdmin();
    });

    // Clean up by closing the page after all tests are done.
    test.afterAll(async () => {
        await page.close();
    });

    test('1. Should add a new user successfully', async () => {
        // This step adds the user. The subsequent tests will verify it.
        await adminPage.addUser(newUserDetails);
    });

    test('2. Should search for the newly created user', async () => {
        // This test verifies that the user from the previous step was added correctly.
        await adminPage.searchUser(newUserDetails.username);
        await expect(page.getByText(newUserDetails.username).first()).toBeVisible();
        await expect(adminPage.recordFoundText).toBeVisible();
    });

    test('3. Should edit the new user\'s status', async () => {
        // The previous test already searched for the user, so they are visible.
        // *** FIX: Calling the correct function to edit the status ***
        await adminPage.editUserStatus(updatedStatus);

        // Search for the user again to see the updated result
        await adminPage.searchUser(newUserDetails.username);

        // *** FIX: Verifying the status was changed in the table row ***
        const userRow = page.getByRole('row').filter({ hasText: newUserDetails.username });
        await expect(userRow).toContainText(updatedStatus);
    });

    test('4. Should delete the user', async () => {
        // Search for the user again to ensure they are visible before deleting.
        await adminPage.searchUser(newUserDetails.username);
        
        // Now, we delete that user.
        await adminPage.deleteUser();
        
        // *** FIX: Verifying the original user is deleted ***
        await adminPage.verifyUserDeleted(newUserDetails.username);
        await expect(adminPage.noRecordsFoundText).toBeVisible();
    });
});
