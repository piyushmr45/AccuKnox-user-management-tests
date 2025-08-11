const { test, expect } = require('@playwright/test');

const url = 'https://opensource-demo.orangehrmlive.com';
const username = 'Admin';
const password = 'admin123';
const newUser = {
  employeeName: 'Sharath V Thampi', // Use an existing employee name from the demo
  username: 'testuser_' + Date.now(),
  password: 'Test@1234'
};

// const updatedUserDetails = {
//     username: 'Peter Mac Anderson',
//     userRole: 'ESS',
//     status: 'Disabled'
// };    

test('Login to OrangeHRM', async ({ page }) => {
  await page.goto(url);
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
});

test('Navigate to Admin module', async ({ page }) => {
  // Login first
  await page.goto(url);
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/dashboard/);

  // Navigate to Admin
  await page.click('a:has-text("Admin")');
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/admin/);
});

test('Add new user', async ({ page }) => {
  // Login and go to Admin
  await page.goto(url);
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
  await page.click('a:has-text("Admin")');
  await expect(page).toHaveURL(/admin/);

  // Click Add
  await page.click('button:has-text("Add")');
  await page.waitForTimeout(10000);
  // Select "Admin" from User Role dropdown
  // Click User Role dropdown
  // Wait for dropdown options to appear
  // Select "Admin" in dropdown
  await page.locator('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)').click();
  await page.locator('div[role="option"]').filter({ hasText: "Admin" }).click();
  await page.waitForTimeout(3000);  
  // Fill Employee Name
  await page.fill('input[placeholder="Type for hints..."]', newUser.employeeName);
  
  await page.locator('div[role="option"]').filter({ hasText: "Sharath V Thampi" }).click("Sharath V Thampi");
  // Wait for dropdown options to appear
  await page.waitForTimeout(3000);

  // Select Status
  await page.locator('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').click();
  await page.locator('div[role="option"]').filter({ hasText: "Enabled" }).click();
  
  //await page.waitForTimeout(5000);

  // Select Employee Name
  
  await page.locator('div[class="oxd-form-row"] div[class="oxd-grid-2 orangehrm-full-width-grid"] div[class="oxd-grid-item oxd-grid-item--gutters"] div[class="oxd-input-group oxd-input-field-bottom-space"] div input[class="oxd-input oxd-input--active"]').fill(newUser.username);
  
  // Select Password
  await page.locator('div[class="oxd-grid-item oxd-grid-item--gutters user-password-cell"] div[class="oxd-input-group oxd-input-field-bottom-space"] div input[type="password"]').fill(newUser.password);
  await page.locator('div[class="oxd-grid-item oxd-grid-item--gutters"] div[class="oxd-input-group oxd-input-field-bottom-space"] div input[type="password"]').fill(newUser.password);
  
  // Save New user
  await page.click('button:has-text("Save")');


  //await expect(page).toHaveURL(/dashboard/);
});

test('Search Newly created User', async ({ page }) => {
  //Login and go to Admin

  await page.goto(url);
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/dashboard/);
  await page.click('a:has-text("Admin")');
  await expect(page).toHaveURL(/admin/);

  // Search
  await page.waitForTimeout(1000);
  await page.locator('div[class="oxd-input-group oxd-input-field-bottom-space"] div input[class="oxd-input oxd-input--active"]').fill(newUser.username);
  await page.waitForTimeout(5000);
  
  await page.click('button[type="submit"]');
});

  // Wait for success message
//  await expect(page.locator('.oxd-toast')).toContainText('Success');

// test('Edit all the possible user details', async ({ page }) =>  {
//   //Login and go to Admin

//   await page.goto(url);
//   await page.fill('input[name="username"]', username);
//   await page.fill('input[name="password"]', password);
//   await page.click('button[type="submit"]');
//   await page.waitForTimeout(1000);
//   await expect(page).toHaveURL(/dashboard/);
//   await page.click('a:has-text("Admin")');
//   await expect(page).toHaveURL(/admin/);

//   // //Search

//   // await page.waitForTimeout(1000);
//   // await page.locator('div[class="oxd-input-group oxd-input-field-bottom-space"] div input[class="oxd-input oxd-input--active"]').fill(newUser.username);
//   // await page.waitForTimeout(5000);
  
//   // await page.click('button[type="submit"]');

//   //Edit all the possible user details
//   await page.locator('div[class="orangehrm-paper-container"] button:nth-child(2)').click('enter');
//   await adminPage.editUser(newUser.username, updatedUserDetails);



// });
