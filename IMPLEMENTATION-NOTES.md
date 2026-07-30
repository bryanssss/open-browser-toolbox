# OpenToolbox V5.2.0 Implementation Notes

This release retains all 122 browser-based utilities and completes a repository-wide dark-mode, design-system and functional regression audit while preserving the static HTML, CSS and JavaScript architecture.



## V5.2.0 visible replacement fix

The previous archive did not produce a visible change for the user. This rebuild changes the actual shared files and all HTML references rather than relying only on a small appended CSS override.

- Removed the earlier V5.1.3 override block and replaced it with one consolidated V5.2 layout block.
- Increased label-to-heading gaps to approximately 13.6 px in compact homepage/dashboard panels.
- Increased breadcrumb-to-title-row spacing to 28 px on desktop.
- Increased category/collection action-button spacing to 16 px.
- Added a critical mobile-only hamburger rule to every HTML page.
- Added JavaScript desktop enforcement using `hidden`, `aria-hidden` and `tabIndex`.
- Versioned shared assets on all 131 pages to bypass stale caches.
- Updated the service worker and added a visible `VERSION.txt` marker.
- Initialised all 122 tool interfaces in headless Chromium with zero initialisation failures and zero page errors.
- Verified Character Counter, Base64, Percentage Calculator and JSON Formatter output.

## V5.1.2 browser-test selector correction

The second failed GitHub Actions run came from an unscoped Playwright role query. The homepage contains an `About` link in both the primary navigation and the footer. Playwright correctly treats an unscoped locator that matches both elements as ambiguous, so the test stopped even though the mobile menu itself was visible and working.

The corrected test now:

- creates a locator for the `#mainNav` navigation landmark;
- checks that the menu has the `open` class;
- searches for primary links only inside that navigation landmark;
- verifies that every expected navigation control appears exactly once;
- separately verifies the theme and settings buttons inside the same landmark.

No public tool code or design component required changing for this correction.

## V5.1.1 continuous-integration correction

The failed GitHub Actions run was caused by the repository validator recursively treating HTML files installed by Playwright inside `node_modules` as OpenToolbox website pages. Those third-party files are not part of the published GitHub Pages site.

This maintenance update:

- limits site-page validation to repository-owned HTML files;
- ignores dependency and generated-report directories;
- validates that the saved-theme bootstrap runs before the first stylesheet;
- runs static validation before installing Playwright dependencies;
- keeps the full browser suite unchanged after dependency and Chromium installation.


## V5.1 design and reliability work

- Replaced missing dark-mode surface fallbacks that caused white cards and unreadable text.
- Standardised cards, settings, inputs, buttons, results, tables, personal panels and responsive navigation.
- Added early theme bootstrapping to every HTML route and network-first delivery for CSS and JavaScript updates.
- Fixed the My Toolbox grid, mobile menu visibility and colour swatch class collision.
- Corrected the Time Zone Converter so the selected source time zone is actually used.
- Improved date defaults, clear/reset behaviour and large-file Data URI conversion.
- Added full-catalogue browser smoke tests and dark-mode regression tests to GitHub Actions.

## Delivered in this release

- 38 additional tools across image processing, PDF inspection, accessibility, developer formatting, finance, date/time, colour and data conversion.
- Advanced line-level text comparison with clearer inserted, deleted and changed output.
- Batch image conversion and resizing performed locally in the browser.
- Local favourites, user-defined collections, recent history and optional saved tool inputs.
- Export, import and deletion controls for locally stored preferences and history.
- Customisable homepage category visibility and ordering.
- Additional keyboard shortcuts and improved focus, live-region and screen-reader behaviour.
- English, Spanish, French, German and Italian interface controls for shared navigation and settings.
- Expanded offline cache and installable PWA support.
- Custom-domain documentation and a ready-to-copy `CNAME.example` file.
- Static validation plus optional Playwright browser tests and GitHub Actions automation.

## Scope notes

- PDF utilities are privacy-safe inspectors for metadata, page counts, page dimensions and form fields. They do not yet merge, split, edit or rewrite PDF files.
- YAML, TOML, SQL and JavaScript helpers are intentionally lightweight and cover common formats. They are not replacements for full language parsers or production build tools.
- Shared interface controls are translated, while individual tool descriptions and detailed tool content remain in English.
- Batch downloads may require the user to allow multiple downloads in their browser.
- All preferences, favourites, collections, history and saved inputs remain in local browser storage. There is no account system or remote synchronisation.


## V5.1.3 Layout Audit

- Shared spacing tokens now separate badges, labels, headings, breadcrumbs and controls consistently.
- The desktop navigation explicitly hides the mobile toggle and remains fully expanded from 761 CSS pixels upward.
- The mobile navigation owns the collapsible behaviour at 760 CSS pixels and below, including outside-click, Escape and breakpoint cleanup.
- Category and collection movement controls use dedicated action groups, visible gaps and disabled first/last states.
- Regression tests now measure real rendered gaps, desktop/mobile visibility, overflow and navigation state.
