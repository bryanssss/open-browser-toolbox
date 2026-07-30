import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const failures = [];
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => failures.push(message);
const check = (condition, message) => condition ? pass(message) : fail(message);
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

const requiredRootFiles = [
  'index.html', 'about.html', 'privacy.html', 'terms.html', 'accessibility.html',
  'custom-domain.html', 'my-toolbox.html', 'offline.html', '404.html',
  'manifest.webmanifest', 'robots.txt', 'sitemap.xml', 'service-worker.js',
  'README.md', 'LICENSE', '.nojekyll'
];
for (const file of requiredRootFiles) {
  check(fs.existsSync(path.join(root, file)), `${file} exists`);
}

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(read('assets/js/tools-data.js'), sandbox, { filename: 'tools-data.js' });
const tools = sandbox.window.TOOLBOX_TOOLS;
check(Array.isArray(tools), 'tool catalogue loads as an array');
check(tools.length === 122, `tool catalogue contains 122 tools (found ${tools.length})`);

const expectedCategories = {
  'Text & Content': 19,
  'Developer Tools': 24,
  'Design & Media': 21,
  'Converters': 21,
  'Calculators': 28,
  'Accessibility': 5,
  'PDF Tools': 4
};
const categoryCounts = tools.reduce((counts, tool) => {
  counts[tool.category] = (counts[tool.category] || 0) + 1;
  return counts;
}, {});
check(JSON.stringify(categoryCounts) === JSON.stringify(expectedCategories),
  `category totals match ${JSON.stringify(expectedCategories)}`);

const slugs = tools.map((tool) => tool.slug);
check(new Set(slugs).size === tools.length, 'all tool slugs are unique');
check(tools.every((tool) => tool.slug && tool.title && tool.category && tool.description && tool.icon),
  'every catalogue entry has complete metadata');
check(tools.every((tool) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tool.slug)),
  'all tool slugs are URL-safe');

const sitemap = read('sitemap.xml');
const serviceWorker = read('service-worker.js');
const homepage = read('index.html');

let validToolPages = 0;
for (const tool of tools) {
  const relative = `tools/${tool.slug}/index.html`;
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) {
    fail(`${relative} is missing`);
    continue;
  }
  const html = fs.readFileSync(absolute, 'utf8');
  const pageChecks = [
    html.includes(`data-tool="${tool.slug}"`),
    html.includes('<main id="main-content"'),
    html.includes('id="toolApp"'),
    html.includes('../../assets/js/common.js'),
    html.includes('../../assets/js/tools-data.js'),
    html.includes('../../assets/js/tool-engine.js'),
    html.includes('../../assets/js/upgrade-tools.js'),
    html.includes(`<title>${tool.title}`),
    html.includes('rel="canonical"')
  ];
  if (pageChecks.every(Boolean)) validToolPages += 1;
  else fail(`${relative} is missing required page structure or scripts`);

  if (!sitemap.includes(`/tools/${tool.slug}/`)) fail(`sitemap is missing ${tool.slug}`);
  if (!serviceWorker.includes(`./tools/${tool.slug}/`)) fail(`offline cache is missing ${tool.slug}`);
}
check(validToolPages === tools.length, `all ${tools.length} tool pages have required structure`);

const cardCount = (homepage.match(/class="tool-card"/g) || []).length;
check(cardCount === tools.length, `homepage renders ${tools.length} static tool cards (found ${cardCount})`);
check(homepage.includes('id="toolSearch"'), 'homepage includes tool search');
check(homepage.includes('id="recentTools"'), 'homepage includes recent tools section');
check(homepage.includes('id="favouriteTools"'), 'homepage includes favourites section');
check(homepage.includes('assets/js/home.js'), 'homepage loads enhanced home controller');

const manifest = JSON.parse(read('manifest.webmanifest'));
check(Boolean(manifest.name && manifest.short_name && manifest.start_url && manifest.icons?.length),
  'web app manifest contains required install metadata');

const jsFiles = [
  'assets/js/common.js', 'assets/js/tools-data.js', 'assets/js/tool-engine.js',
  'assets/js/upgrade-tools.js', 'assets/js/home.js', 'assets/js/my-toolbox.js',
  'service-worker.js'
];
for (const file of jsFiles) {
  try {
    new vm.Script(read(file), { filename: file });
    pass(`${file} parses successfully`);
  } catch (error) {
    fail(`${file} has a syntax error: ${error.message}`);
  }
}

const docsChecks = [
  ['README.md', '122'],
  ['README.md', 'privacy'],
  ['GITHUB-DESKTOP-DEPLOYMENT.md', 'GitHub Desktop'],
  ['docs/CUSTOM-DOMAIN.md', 'CNAME'],
  ['SECURITY.md', 'client-side']
];
for (const [file, phrase] of docsChecks) {
  check(read(file).toLowerCase().includes(phrase.toLowerCase()), `${file} documents “${phrase}”`);
}

if (failures.length) {
  console.error(`\n${failures.length} validation failure(s):`);
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}
console.log(`\nAll static validations passed for ${tools.length} tools.`);
