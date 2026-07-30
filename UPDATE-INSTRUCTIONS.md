# OpenToolbox V5.1.2 Update Instructions

This maintenance update fixes the remaining Playwright mobile-navigation assertion without changing the 122 public tools or the corrected dark-mode design.

## Full V5.1 Update Instructions

## What this package does

This update expands OpenToolbox from 84 to 122 tools and adds local preferences, history, custom favourite collections, improved offline support, accessibility improvements, optional interface languages, advanced keyboard controls and automated browser tests.

## Install with GitHub Desktop

1. Back up your current local `open-browser-toolbox` folder.
2. Extract the new ZIP.
3. Open the extracted `open-browser-toolbox` folder.
4. Copy every file and folder inside it.
5. Paste them directly into your existing local repository folder.
6. Choose **Replace the files in the destination** when Windows asks.
7. Open GitHub Desktop and select the repository.
8. Review the changed files.
9. Use this commit summary:

```text
OpenToolbox V5.1.2: fix scoped mobile navigation browser test
```

10. Select **Commit to main**.
11. Select **Push origin**.
12. Open the repository’s **Actions** tab and confirm the test workflow passes.
13. Open the GitHub Pages website and press `Ctrl + F5`.

## Important folder check

The repository root must contain `index.html` directly:

```text
open-browser-toolbox/
├── index.html
├── assets/
├── tools/
├── tests/
└── .github/
```

Do not create a duplicated nested folder such as:

```text
open-browser-toolbox/open-browser-toolbox/index.html
```

For screenshots and more detail, read `GITHUB-DESKTOP-DEPLOYMENT.md`.
