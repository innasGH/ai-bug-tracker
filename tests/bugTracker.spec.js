const { test, expect } = require('@playwright/test');

test('User can submit a bug report', async ({ page }) => {
    await page.goto('http://localhost:3002');
    await page.fill('#title', 'Playwright Test Bug');
    await page.fill('#description', 'Bug description here.');
    await page.selectOption('#priority', 'High');
    await page.click('button[type="submit"]');
    const newBug = page.locator('ul#bugList li').filter({ hasText: 'Playwright Test Bug' }).last();
    await expect(newBug).toBeVisible();


});

test('User can update a bug status', async ({ page }) => {
    await page.goto('http://localhost:3002');

    // Submit a new bug
    await page.fill('#title', 'Bug to be updated');
    await page.fill('#description', 'This bug needs an update.');
    await page.selectOption('#priority', 'Medium');
    await page.click('button[type="submit"]');

    // Wait for the bug to appear
    const bugToUpdate = page.locator('ul#bugList li').filter({ hasText: 'Bug to be updated' }).first();
    await expect(bugToUpdate).toBeVisible();



    // Change status to "Resolved"
    await bugToUpdate.locator('.status-dropdown').selectOption('Resolved');
    await bugToUpdate.locator('.update-status').click();

    // Verify status update
    await expect(bugToUpdate).toContainText('Resolved');
});


