# GitHub Desktop Update Guide — OpenToolbox V5.2.0

## Before You Start

Create a backup copy of your existing `open-browser-toolbox` folder.

## Replace the Project Files Correctly

1. Extract the new ZIP.
2. Open the extracted `open-browser-toolbox` folder.
3. Press `Ctrl + A` inside that folder to select every file and folder.
4. Press `Ctrl + C`.
5. Open your existing local GitHub repository folder.
6. Paste the files directly into that folder.
7. Select **Replace the files in the destination** when Windows asks.

The correct structure is:

```text
open-browser-toolbox/
├── index.html
├── VERSION.txt
├── assets/
├── tools/
├── tests/
└── .github/
```

It must not become:

```text
open-browser-toolbox/open-browser-toolbox/index.html
```

## Confirm the New Files Were Actually Copied

Before committing, open these files in the local repository:

- `VERSION.txt` must say `5.2.0`.
- `assets/css/styles.css` must contain `OpenToolbox v5.2` near the bottom.
- `service-worker.js` must contain `open-toolbox-v5-2-0-visible-layout-fix`.
- `index.html` must contain `styles.css?v=5.2.0` and `data-build="5.2.0"`.

GitHub Desktop should show changes to many HTML pages because every page now has versioned CSS and JavaScript references.

## Commit in GitHub Desktop

1. Open GitHub Desktop.
2. Select `open-browser-toolbox`.
3. Wait for the changed-file list to load.
4. Confirm that `index.html`, `assets/css/styles.css`, `assets/js/common.js`, `service-worker.js` and many files under `tools/` appear.
5. Enter this summary:

```text
OpenToolbox V5.2.0: visible spacing, desktop menu removal and cache refresh
```

6. Select **Commit to main**.
7. Select **Push origin**.

## Confirm GitHub Pages

1. Open the repository on GitHub.
2. Open **Actions** and wait for **Browser and Static Tests** to pass.
3. Open the live site.
4. Press `Ctrl + F5`.
5. When needed, open Chrome DevTools → **Application → Service Workers**, select **Unregister**, and reload once.

## Verify the Deployed Version

1. Right-click the live homepage and choose **View page source**.
2. Search for:

```text
data-build="5.2.0"
```

3. Also search for:

```text
styles.css?v=5.2.0
```

When both are present, the new repository files are deployed.

## Visual Checks

- At desktop width, the hamburger button must not exist visually or in keyboard navigation.
- At 760 px and below, the hamburger appears and opens the complete menu.
- The pill above **Favourites** and **Recently used** has a clear gap before the heading.
- Tool breadcrumbs have a clear gap before the category badge and title.
- Category ordering arrow buttons have a visible 16 px gap.
