# GitHub Desktop Update Guide

## Before You Start

Create a backup copy of your existing `open-browser-toolbox` folder.

## Replace the Project Files

1. Extract the new ZIP.
2. Open the extracted folder.
3. Select every file and folder inside it.
4. Copy them.
5. Open the existing local GitHub repository folder.
6. Paste the files into that folder.
7. Select **Replace the files in the destination** when Windows asks.
8. Do not create a second folder inside the existing repository.

The correct structure is:

```text
open-browser-toolbox/
├── index.html
├── README.md
├── assets/
├── tools/
├── tests/
└── .github/
```

It must not become:

```text
open-browser-toolbox/open-browser-toolbox/index.html
```

## Commit in GitHub Desktop

1. Open GitHub Desktop.
2. Select `open-browser-toolbox` from the repository list.
3. Wait for the changed-file list to finish loading.
4. Confirm that many HTML files, JavaScript files and documentation files are listed.
5. Enter this summary:

```text
OpenToolbox V5.1.2: fix scoped mobile navigation browser test
```

6. Select **Commit to main**.
7. Select **Push origin**.

## Confirm GitHub Pages

1. Open the repository on GitHub.
2. Select **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, confirm:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Open the Actions tab and wait for the browser-test workflow to pass.
6. Visit:

```text
https://bryanssss.github.io/open-browser-toolbox/
```

7. Press `Ctrl + F5` to bypass the old browser cache.

## Service Worker Cache Notice

This version changes the service-worker cache name. Most browsers update automatically after the new deployment loads. When an old page remains visible:

1. Press `Ctrl + F5`.
2. Close and reopen the tab.
3. In Chrome DevTools, open **Application → Service Workers**.
4. Select **Update** or **Unregister**, then reload.


## Confirm the Fixed Test Run

After pushing, open **Actions → Browser and Static Tests**. The **Run static validation** step should now report that all 131 project HTML pages apply the saved theme before CSS loads. It will no longer inspect Playwright files inside `node_modules`.


## Confirm the Browser-Test Correction

After pushing, open **Actions → Browser and Static Tests**. The mobile-navigation test now searches only inside the `#mainNav` element. This prevents the footer’s separate `About` link from creating an ambiguous Playwright locator. Both the desktop and mobile Chromium projects should continue beyond this test.
