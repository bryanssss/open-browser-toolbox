# OpenToolbox V5.2.0 Update Instructions

Replace the contents of the existing repository with the contents of the new ZIP, then commit and push with GitHub Desktop.

Use this commit message:

```text
OpenToolbox V5.2.0: visible spacing, desktop menu removal and cache refresh
```

Confirm the copy before committing:

- `VERSION.txt` says `5.2.0`.
- `index.html` contains `data-build="5.2.0"`.
- `index.html` loads `styles.css?v=5.2.0`.
- `service-worker.js` contains `open-toolbox-v5-2-0-visible-layout-fix`.

After GitHub Pages deploys, press `Ctrl + F5`. When an old service worker still controls the page, unregister it once through Chrome DevTools → Application → Service Workers.
