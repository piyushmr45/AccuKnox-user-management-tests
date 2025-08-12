OrangeHRM User Management Automation with Playwright

This project contains automated test cases for the User Management module of the OrangeHRM demo application. The tests are written in JavaScript using the Playwright framework and follow the Page Object Model (POM) design pattern to test a complete user workflow: adding, searching, editing, and deleting a user.

Playwright Version
Playwright Version: 1.45.1 (or latest)

Project Setup
To get the project up and running on your local machine, follow these steps.
1. PrerequisitesEnsure you have Node.js installed on your system. You can download it from nodejs.org. Version 16 or higher is recommended.
2. Clone the RepositoryIf your project is in a Git repository, clone it to your local machine.
git clone <your-repository-url>
cd <your-repository-directory>
3. Install DependenciesNavigate to the project directory in your terminal and run the following command to install Playwright and other necessary packages defined in your package.json file.
npm install
4. Install Playwright BrowsersThis crucial step downloads the browser binaries (Chromium, Firefox, WebKit) that Playwright needs to run the tests.
npx playwright install

How to Run the Tests
You can run the tests in different modes depending on your needs.

Run in Headless Mode (Default)
This command runs all tests without opening a visible browser window. It's ideal for running tests in CI/CD pipelines or for quick checks.
npx playwright test

Run in Headed Mode
This command runs the tests in a visible browser window, allowing you to watch the automation in real-time. This is very useful for debugging.
npx playwright test --headed

View the HTML Report
After the tests have finished, Playwright automatically generates a detailed HTML report. To open it, use this command:
npx playwright show-report

Project Structure
The project is organized using the Page Object Model for better maintainability..
├── pages/
│   ├── LoginPage.js      # Page Object for the Login page
│   └── AdminPage.js      # Page Object for the Admin/User Management page
├── tests/
│   └── orangehrm.spec.js # Test file containing the user workflow test cases
├── package.json
└── README.md
