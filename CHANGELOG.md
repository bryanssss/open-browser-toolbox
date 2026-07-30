# Changelog

## V5.2.0 — Visible Spacing, Desktop Menu Removal and Cache Refresh

- Rebuilt the shared spacing rules with larger, measurable gaps.
- Hid the hamburger on desktop through CSS, inline critical CSS and JavaScript accessibility state.
- Restricted collapsible navigation to widths of 760 px and below.
- Added versioned CSS/JavaScript URLs to all 131 HTML pages.
- Added the `data-build="5.2.0"` deployment marker and `VERSION.txt`.
- Updated the service-worker cache name to force replacement of old assets.
- Rechecked all 122 tool initialisations and representative calculations in Chromium.

## V5.1.3 — Layout, Spacing and Responsive Navigation Audit

- Added consistent vertical spacing between section badges, labels and headings across the homepage, tool pages and My Toolbox
- Added clear spacing between breadcrumbs and tool-title content on all 122 tool routes
- Added consistent horizontal gaps between category and collection ordering buttons
- Disabled unavailable first/last movement controls to prevent confusing no-op actions
- Restricted the hamburger menu to screens 760 CSS pixels wide or narrower
- Kept the full navigation visible on desktop and tablet layouts, including high-zoom desktop views where space permits
- Added mobile-menu close behaviour for outside clicks, navigation selection, Escape and breakpoint changes
- Added responsive-navigation, spacing and overflow regression tests
- Updated the offline cache version so the revised CSS and JavaScript replace older cached files

## V5.1.2 — Browser-Test Selector Fix

- Fixed the mobile-navigation Playwright test matching duplicate links elsewhere on the page, such as the footer’s `About` link
- Scoped every navigation assertion to the `#mainNav` landmark
- Added one-element count checks for all primary navigation links, the theme control and the settings control
- Kept the public website and all 122 tools unchanged because the failure was in the automated test selector, not the user interface

## V5.1.1 — GitHub Actions Validation Fix

- Fixed the static validator scanning third-party HTML files installed inside `node_modules`
- Excluded generated test folders such as `playwright-report`, `test-results` and `coverage`
- Improved the theme-bootstrap check so it verifies that the saved theme script appears before the first stylesheet
- Moved static validation before dependency installation in GitHub Actions
- Updated the official checkout and Node setup actions to their Node 24-based major versions
- Verified the validator still passes when a deliberately broken HTML file exists inside `node_modules`

## V5.1 — Dark-Mode and Full Design Audit

- Fixed white cards, white modals and low-contrast text appearing in dark mode
- Added complete dark and light surface variables for cards, soft panels and form inputs
- Revised shared tool panels, result boxes, dashboard cards, tables, controls and donation panels
- Balanced the My Toolbox dashboard layout
- Fixed mobile navigation links being hidden after the menu opened
- Fixed a CSS class collision that damaged colour-palette swatches
- Added early saved-theme loading to all 131 HTML pages
- Updated service-worker caching so CSS and JavaScript revisions are fetched before cached copies
- Improved theme-toggle labels, icons and theme-colour metadata
- Improved reset behaviour for text, select, checkbox, range and file controls
- Corrected Time Zone Converter source-zone calculations
- Corrected local date and time defaults across date utilities
- Improved Data URI processing for larger files
- Added dark-mode, mobile-navigation, full-catalogue and representative-tool Playwright tests
- Added static checks for design tokens, theme bootstrapping and all 3,818 local references

## V5 — Expanded Browser Toolbox

- Expanded from 84 to 122 tools
- Added image conversion and batch processing
- Added PDF inspection utilities
- Added accessibility review tools
- Added developer formatters and data converters
- Added finance, date and time calculators
- Enhanced text comparison
- Added local preferences, history, collections and import/export
- Added category customisation and interface languages
- Improved offline caching and PWA installation
- Expanded keyboard and screen-reader guidance
- Added static and Playwright browser testing
- Added custom-domain documentation
