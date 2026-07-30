# 🧰 OpenToolbox — 122 Free Browser Tools

A fast, privacy-focused collection of **122 free browser tools** for text, development, design, images, accessibility, PDFs, data conversion, dates, finance and everyday calculations.

## 🚀 Use OpenToolbox Online

### 👉 https://bryanssss.github.io/open-browser-toolbox/

No installation, account or registration is required.

[![Open OpenToolbox](https://img.shields.io/badge/Open%20OpenToolbox-Use%20Online-00c873?style=for-the-badge&logo=googlechrome&logoColor=white)](https://bryanssss.github.io/open-browser-toolbox/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-222222?style=for-the-badge&logo=github)](https://pages.github.com/)
[![MIT Licence](https://img.shields.io/badge/Licence-MIT-0b7a4b?style=for-the-badge)](LICENSE)

## ✨ What Is Included

| Category | Tools |
|---|---:|
| Text & Content | 19 |
| Developer Tools | 24 |
| Design & Media | 21 |
| Converters | 21 |
| Calculators | 28 |
| Accessibility | 5 |
| PDF Tools | 4 |
| **Total** | **122** |

## 🛠️ V5.1.2 GitHub Actions and Browser-Test Fixes

- Corrected the static validator so it checks only OpenToolbox pages and ignores HTML files installed inside `node_modules`.
- Excluded generated folders such as `playwright-report`, `test-results` and `coverage` from repository-page validation.
- Strengthened the saved-theme test so the bootstrap script must appear before the first stylesheet.
- Moved static validation before Playwright dependency installation.
- Corrected the mobile-menu browser test so navigation links are searched only inside `#mainNav`, avoiding duplicate footer links such as `About`.
- Added exact one-element checks for the menu links, theme control and settings control.
- Updated the official GitHub checkout and Node setup actions to their Node 24-based major versions.

## 🆕 Major V5.1 Improvements

### Professional dark-mode and interface revision

- Rebuilt the dark surface tokens used by dashboard cards, settings, hints, forms and personalisation panels.
- Removed white panels and low-contrast white-on-white text from dark mode.
- Improved form, button, modal, focus, table and result styling across every tool page.
- Balanced the My Toolbox dashboard so compact panels align cleanly and workflow sections use the full width.
- Fixed the mobile navigation so every link and interface action is visible after opening the menu.
- Prevented compact contrast-audit colour chips from overriding the main colour-palette swatches.
- Added early theme loading and a new service-worker cache version so saved themes and design updates appear reliably.
- Corrected source-zone handling in the Time Zone Converter and strengthened local date defaults, reset controls and large-file Data URI encoding.
- Expanded automated regression checks for all 122 routes, dark surfaces, mobile navigation and representative tool calculations.


This release implements the previously planned expansion while keeping the project static, browser-based and easy to deploy.

### New Tools

- More image format tools, including PNG/JPEG/WebP conversion, batch image processing, metadata inspection and colour-vision simulation
- Local PDF metadata, page-count, page-size and form-field inspection tools
- Accessibility checks for accessible names, image alternatives, headings, tap targets and screen-reader text
- XML, SQL, JavaScript and YAML formatting/conversion tools
- Additional finance calculators for savings goals, debt payoff, ROI and break-even analysis
- Additional date and time tools for duration, working hours, repeating dates and date arithmetic
- More colour tools, including colour mixing and full-palette contrast auditing
- More data formats, including XML, TOML, YAML, Data URI, Base64 files and delimiter conversion
- More advanced text comparison with line, word and character modes, optional normalisation and exportable reports

### Personalisation and Local Data

- Optional saved tool inputs
- Local tool usage history
- Custom favourite collections
- Customisable homepage category order and visibility
- Export and import of all OpenToolbox local data
- Interface languages for common controls: English, Spanish, French, German and Italian
- Adjustable text size and reduced-motion preference
- Keyboard shortcuts for search, running tools, navigation and dialogs

### Offline, Accessibility and Testing

- Improved service worker with offline fallback and runtime cache updates
- Installable PWA controls where supported
- Skip links, semantic landmarks, stronger focus visibility and live announcements
- Screen-reader and keyboard guidance on tool pages
- Expanded static validation
- Optional Playwright browser tests for navigation, keyboard access, mobile layout and basic accessibility checks
- Custom-domain documentation and a ready-to-copy `CNAME.example`

## 🔒 Privacy

Most inputs are processed entirely inside the visitor’s browser.

Uploaded images and PDFs are read locally using browser APIs. OpenToolbox does not run an application server that receives those files.

Optional favourites, collections, history, category settings, interface preferences and saved tool inputs are stored in browser `localStorage`. Visitors can export, import or delete this local data from **My Toolbox**.

Two existing tools use external resources:

- **Currency Converter:** requests reference exchange-rate data from the Frankfurter API.
- **QR Code Generator:** may load the MIT-licensed QRCode.js library from jsDelivr before rendering locally.

GitHub Pages may process normal hosting logs under GitHub’s own policies.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Command + K` | Focus tool search or return to the library |
| `/` | Focus homepage search |
| `Ctrl/Command + Enter` | Run the current tool |
| `Alt + H` | Return to the homepage |
| `Escape` | Close open dialogs |

## 📦 Runtime Architecture

OpenToolbox remains a static project:

- No build is required for deployment
- No npm dependency is required for visitors
- Shared CSS and JavaScript power every page
- Every tool has a separate indexable URL
- Tool metadata is stored in `assets/js/tools-data.js`
- Existing tools are powered by `assets/js/tool-engine.js`
- New and enhanced tools are powered by `assets/js/upgrade-tools.js`
- Personalisation is handled by `common.js`, `home.js` and `my-toolbox.js`

The optional npm configuration is used only for automated testing. It is not required to publish or use the site.

## 🖥️ Run Locally

Double-clicking `index.html` works for many features, but the service worker and some browser APIs work best through a local server.

With Python installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## ✅ Run Static Validation

Node.js is only needed for repository validation:

```bash
node test-site.mjs
```

## 🌐 Run Optional Browser Tests

```bash
npm install
npx playwright install chromium
npm test
```

The deployment itself still requires no npm build.

## 🚀 Publish the Update with GitHub Desktop

1. Download and extract the updated ZIP.
2. Open your existing `open-browser-toolbox` folder on the computer.
3. Keep a backup copy of the old folder.
4. Copy everything from the updated folder into the existing repository folder.
5. Allow Windows to replace files with the same names.
6. Open GitHub Desktop.
7. Select the `open-browser-toolbox` repository.
8. Review the changed files.
9. In the summary box, enter:

```text
OpenToolbox V5.1.2: fix scoped mobile navigation browser test
```

10. Select **Commit to main**.
11. Select **Push origin**.
12. Wait for GitHub Pages and the browser-test workflow to finish.
13. Open the live site and hard-refresh it with `Ctrl + F5`.

A more detailed guide is included in [`GITHUB-DESKTOP-DEPLOYMENT.md`](GITHUB-DESKTOP-DEPLOYMENT.md).

## 🌍 Optional Custom Domain

The project supports GitHub Pages project URLs and custom domains because internal links are relative.

See:

- [`custom-domain.html`](custom-domain.html)
- [`docs/CUSTOM-DOMAIN.md`](docs/CUSTOM-DOMAIN.md)
- [`CNAME.example`](CNAME.example)

## 🧪 Automated Quality Checks

The repository checks:

- Tool metadata count and uniqueness
- Required tool pages and assets
- Tool initialisation attributes
- SEO titles, descriptions and canonical URLs
- Skip links, main landmarks and labelled navigation
- Donation and privacy references
- Service-worker coverage
- Sitemap coverage
- JavaScript syntax
- Browser navigation, search, keyboard access and responsive layout through Playwright

## 💛 Support the Project

All tools remain free. Donations are optional.

[![Donate with PayPal](https://img.shields.io/badge/Donate%20with-PayPal-0070ba?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/donate/?hosted_button_id=YE9H5NCNLWU38)

## ⚠️ Accuracy Notice

The tools provide informational estimates and lightweight browser-based inspections. Verify results before using them for medical, financial, legal, tax, accessibility, construction, engineering, document-production or safety-critical decisions.

The PDF tools use lightweight local structural inspection. Compressed or unusual PDFs may require a full specialist PDF application for exact results.

## 🧾 Original Work and Copyright

OpenToolbox is an independent implementation of common browser utility concepts. It does not copy another website’s source code, branding, design, logo or written content.

## 📄 Licence

Released under the [MIT Licence](LICENSE).
