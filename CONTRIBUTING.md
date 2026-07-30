# Contributing to OpenToolbox

Contributions should preserve the project principles: free, useful, privacy-focused, browser-based, accessible, mobile-friendly, easy to deploy and open source.

## Before Opening a Pull Request

- Keep runtime features client-side whenever practical.
- Do not add trackers, advertising scripts or mandatory accounts.
- Avoid large dependencies for simple functionality.
- Add clear labels, keyboard support and visible focus.
- Test narrow mobile widths and 200% zoom.
- Explain external network requests in the privacy page.
- Add or update static and browser tests.
- Run `node test-site.mjs`.

## New Tool Checklist

1. Add metadata to `assets/js/tools-data.js`.
2. Add the renderer to the appropriate shared engine.
3. Create the tool page under `tools/<slug>/index.html`.
4. Add the page to the service-worker list and sitemap.
5. Add purpose, privacy, instructions and accuracy guidance.
6. Test without an account and without uploading data to an application server.
