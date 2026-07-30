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


test('dark mode uses dark, readable surfaces throughout the interface', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('ot-theme', 'dark'));
  await page.goto('/tools/base64-encoder-decoder/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const surfaces = await page.locator('.tool-panel, .keyboard-hint').evaluateAll(elements => elements.map(element => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, colour: style.color };
  }));
  for (const surface of surfaces) {
    expect(surface.background).not.toBe('rgb(255, 255, 255)');
    expect(surface.colour).not.toBe('rgb(255, 255, 255, 0)');
  }

  await page.goto('/my-toolbox.html');
  const cardBackgrounds = await page.locator('.dashboard-card').evaluateAll(elements => elements.map(element => getComputedStyle(element).backgroundColor));
  expect(cardBackgrounds.length).toBeGreaterThan(0);
  expect(cardBackgrounds.every(background => background !== 'rgb(255, 255, 255)')).toBeTruthy();
  const settingsButton = page.locator('[data-settings-open]').first();
  if (!(await settingsButton.isVisible())) await page.locator('[data-menu-toggle]').click();
  await settingsButton.click();
  await expect(page.locator('#settingsDialog')).toBeVisible();
  const dialogBackground = await page.locator('.dialog-card').evaluate(element => getComputedStyle(element).backgroundColor);
  expect(dialogBackground).not.toBe('rgb(255, 255, 255)');
});

test('mobile menu displays every primary navigation action', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('[data-menu-toggle]').click();
  for (const label of ['All tools', 'About', 'My Toolbox', 'GitHub', 'Donate']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
  await expect(page.getByRole('button', { name: /Switch to|theme/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open settings' })).toBeVisible();
});

test('all 122 tool routes initialise without JavaScript failures', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'Full catalogue smoke test runs once on desktop Chromium.');
  test.setTimeout(180_000);
  const failures = [];
  page.on('pageerror', error => failures.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
  await page.goto('/');
  const slugs = await page.evaluate(() => (window.TOOLBOX_TOOLS || []).map(tool => tool.slug));
  expect(slugs).toHaveLength(122);
  for (const slug of slugs) {
    await page.goto(`/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
    const app = page.locator('#toolApp');
    await expect(app, `tool failed to render: ${slug}`).not.toBeEmpty();
    await expect(app, `tool reported an initialisation failure: ${slug}`).not.toContainText(/could not be initialised|Tool definition not found/i);
  }
  expect(failures, failures.join('\n')).toEqual([]);
});

test('representative tools calculate, convert and clear correctly', async ({ page }) => {
  await page.goto('/tools/percentage-calculator/');
  await page.locator('#a').fill('25');
  await page.locator('#b').fill('200');
  await page.locator('#run').click();
  await expect(page.locator('#result')).toContainText('50');
  await page.locator('#reset').click();
  await expect(page.locator('#result')).toContainText('Your result will appear here');

  await page.goto('/tools/base64-encoder-decoder/');
  await page.locator('#input').fill('OpenToolbox');
  await page.locator('#encode').click();
  await expect(page.locator('#out')).toHaveText('T3BlblRvb2xib3g=');

  await page.goto('/tools/heading-structure-checker/');
  await page.locator('#run').click();
  await expect(page.locator('#result')).toContainText('No obvious hierarchy problems detected');
});
