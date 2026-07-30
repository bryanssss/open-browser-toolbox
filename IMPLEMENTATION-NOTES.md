# OpenToolbox V5 Implementation Notes

This release expands the toolbox from 84 to 122 browser-based utilities while retaining the original static HTML, CSS and JavaScript architecture.

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
