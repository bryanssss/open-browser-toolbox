import { test, expect } from '@playwright/test';

test('homepage search and category filtering work', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Useful online tools');
  await page.locator('#toolSearch').fill('PDF metadata');
  await expect(page.locator('.tool-card:visible')).toHaveCount(1);
  await expect(page.locator('.tool-card:visible')).toContainText('PDF Metadata Inspector');
});

test('keyboard search and tool execution work', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  await expect(page.locator('#toolSearch')).toBeFocused();
  await page.goto('/tools/percentage-calculator/');
  await page.keyboard.press('Control+Enter');
  await expect(page.locator('#result')).not.toContainText('Your result will appear here');
});

test('new image and PDF tools initialise', async ({ page }) => {
  for (const slug of ['batch-image-processor', 'pdf-metadata-inspector', 'aria-label-checker', 'savings-goal-calculator']) {
    await page.goto(`/tools/${slug}/`);
    await expect(page.locator('#toolApp')).not.toContainText('could not be initialised');
    await expect(page.locator('#run')).toBeVisible();
  }
});

test('mobile navigation opens and no horizontal overflow is present', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('[data-menu-toggle]').click();
  await expect(page.locator('#mainNav')).toHaveClass(/open/);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
});

test('basic accessible structure is present', async ({ page }) => {
  await page.goto('/tools/heading-structure-checker/');
  await expect(page.locator('.skip-link')).toHaveAttribute('href', '#main-content');
  await expect(page.locator('main#main-content')).toHaveCount(1);
  await expect(page.locator('nav[aria-label="Main navigation"]')).toHaveCount(1);
  await expect(page.locator('#toolApp')).toHaveAttribute('aria-live', 'polite');
});
