const { test, expect } = require('@playwright/test');

test('User can submit a bug report', async ({ page }) => {
    await page.goto('http://localhost:3002');
    await page.fill('#title', 'Playwright Test Bug');
    await page.fill('#description', 'Bug description here.');
    await page.selectOption('#priority', 'High');
    await page.click('button[type="submit"]');
    await expect(page.locator('ul#bugList li').last()).toContainText('Playwright Test Bug');

});

