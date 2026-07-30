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


test('desktop navigation never shows the mobile menu button', async ({ page }) => {
  for (const width of [800, 900, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const toggle = page.locator('[data-menu-toggle]');
    await expect(toggle).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-hidden', 'true');
    await expect(toggle).toHaveAttribute('tabindex', '-1');
    await expect(page.locator('#mainNav')).toBeVisible();
    await expect(page.locator('#mainNav')).not.toHaveClass(/open/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBeFalsy();
  }
});

test('shared headings, breadcrumbs and dashboard controls have deliberate spacing', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('ot-history', JSON.stringify([{slug:'sentence-counter',title:'Sentence Counter',category:'Text & Content',icon:'💬',visitedAt:new Date().toISOString(),runs:1}]));
  });
  await page.reload();
  const homeGap = await page.locator('#personalSections .section-head.compact').first().evaluate(el => {
    const badge=el.querySelector('.eyebrow'); const heading=el.querySelector('h2');
    return heading.getBoundingClientRect().top-badge.getBoundingClientRect().bottom;
  });
  expect(homeGap).toBeGreaterThanOrEqual(12);

  await page.goto('/tools/character-counter/');
  const breadcrumbGap = await page.evaluate(() => {
    const breadcrumbs=document.querySelector('.breadcrumbs'); const row=document.querySelector('.tool-title-row');
    return row.getBoundingClientRect().top-breadcrumbs.getBoundingClientRect().bottom;
  });
  expect(breadcrumbGap).toBeGreaterThanOrEqual(20);

  await page.goto('/my-toolbox.html');
  const buttonGap = await page.locator('.category-actions').first().evaluate(el => {
    const buttons=[...el.querySelectorAll('button')];
    return buttons[1].getBoundingClientRect().left-buttons[0].getBoundingClientRect().right;
  });
  expect(buttonGap).toBeGreaterThanOrEqual(14);
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
  const toggle = page.locator('[data-menu-toggle]');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-hidden', 'false');
  await toggle.click();

  const navigation = page.locator('#mainNav');
  await expect(navigation).toHaveClass(/open/);

  for (const label of ['All tools', 'About', 'My Toolbox', 'GitHub', 'Donate']) {
    const link = navigation.getByRole('link', { name: label, exact: true });
    await expect(link).toHaveCount(1);
    await expect(link).toBeVisible();
  }

  const themeButton = navigation.getByRole('button', { name: /Switch to (?:light|dark) theme/i });
  await expect(themeButton).toHaveCount(1);
  await expect(themeButton).toBeVisible();

  const settingsButton = navigation.getByRole('button', { name: 'Open settings', exact: true });
  await expect(settingsButton).toHaveCount(1);
  await expect(settingsButton).toBeVisible();
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
