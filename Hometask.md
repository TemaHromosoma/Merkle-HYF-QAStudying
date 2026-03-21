Exercise 6: Write a Login Test from Scratch

Create tests/login.spec.ts (don't use codegen this time!)

Write these 3 tests manually:

Test 1: Successful login
Navigate to https://raider-test-site.onrender.com/, go to login, fill valid credentials, assert success

Test 2: Failed login with wrong password
Fill wrong password, click submit, assert error message is visible

Test 3: Empty form submission
Click submit without filling anything, assert validation message appears

Run your tests:
npx playwright test tests/login.spec.ts --headed

---------------------------------------------------------------
Tips
Use getByRole and getByLabel, NOT CSS selectors
Use the Arrange-Act-Assert pattern for each test
Reference: https://playwright.dev/docs/writing-tests#first-test
---------------------------------------------------------------

====================================================================================================================================

Exercise 7: Expand Tests and Debug Failures

Part A: Add baseURL to config (5 min)
1. Open playwright.config.ts, add baseURL: 'https://raider-test-site.onrender.com/' in the use block
2. Update your tests to use page.goto('/') instead of the full URL
3. Run tests - they should still pass

Part B: Add more tests (10 min)
4. Add a test: navigate to Products page, verify at least one product is visible
5. Add a test: click a product, verify the product detail page loads
6. Add a test: use the navigation menu to visit each page

Part C: Practice debugging (5 min)
7. Intentionally break a test (use a wrong selector)
8. Run: npx playwright test --debug and step through the failure
9. Run: npx playwright show-report and find the error + screenshot
10. Fix the test and verify it passes

=====================================================================================================================================

Week 6 Homework

Assignment 1: Complete test suite for login (required)
Write a test file with at least 4 tests covering: valid login, invalid password,
empty username, empty password. Use meaningful test names.

Assignment 2: Navigation tests (required)
Write tests that verify every page in the navigation menu loads correctly.
Each test should check the URL and a visible heading on the page.

Assignment 3: Product page tests (bonus)
Write tests that browse the products page, click on a product,
and verify the product detail page shows the correct information.

Submission
Push your project to GitHub and share the repository link.
Make sure npx playwright test passes before submitting!

