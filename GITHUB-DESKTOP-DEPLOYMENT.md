# Publish OpenToolbox with GitHub Desktop

This guide assumes you are signed in to GitHub Desktop with the GitHub account **bryanssss**.

## 1. Extract the project

1. Download `open-browser-toolbox.zip`.
2. Open your **Downloads** folder.
3. Right-click the ZIP file.
4. Select **Extract All**.
5. Select **Extract**.
6. You should now have a folder named:

```text
open-browser-toolbox
```

Open it once and confirm that `index.html`, `README.md`, `tools`, and `assets` are directly inside it.

## 2. Add it to GitHub Desktop

1. Open **GitHub Desktop**.
2. At the top-left, select **File**.
3. Select **Add local repository**.
4. Select **Choose**.
5. Select the extracted `open-browser-toolbox` folder.
6. Select **Add repository**.

### If GitHub Desktop says the folder is not a Git repository

1. Select **create a repository** in the message shown by GitHub Desktop.
2. For **Name**, enter:

```text
open-browser-toolbox
```

3. Leave **Local path** pointing to the extracted folder.
4. Do not create a second README, licence, or `.gitignore`, because the project already contains them.
5. Select **Create repository**.

## 3. Make the first commit

1. Look at the bottom-left of GitHub Desktop.
2. In **Summary**, enter:

```text
Initial OpenToolbox release
```

3. The description box can stay empty.
4. Select **Commit to main**.

## 4. Publish the repository

1. At the top of GitHub Desktop, select **Publish repository**.
2. Confirm the repository name is:

```text
open-browser-toolbox
```

3. Use this description:

```text
84 free, privacy-focused browser tools for text, development, design, conversions and everyday calculations.
```

4. Make sure **Keep this code private** is **unticked**.
5. For **Organisation**, keep **None** unless you deliberately want another owner.
6. Select **Publish repository**.

## 5. Open the repository on GitHub

1. In GitHub Desktop, select **Repository** from the top menu.
2. Select **View on GitHub**.
3. Your browser should open this repository:

```text
https://github.com/bryanssss/open-browser-toolbox
```

## 6. Turn on GitHub Pages

1. On the repository page, select **Settings**.
2. In the left sidebar, under **Code and automation**, select **Pages**.
3. Under **Build and deployment**, find **Source**.
4. Select **Deploy from a branch**.
5. Under **Branch**, select:

```text
main
```

6. In the folder box beside it, select:

```text
/(root)
```

7. Select **Save**.

## 7. Open the website

After GitHub completes the Pages deployment, the website address will be:

```text
https://bryanssss.github.io/open-browser-toolbox/
```

On the **Settings → Pages** screen, GitHub will display the published address when it is ready.

## 8. Publish future changes

Whenever you edit files later:

1. Open GitHub Desktop.
2. Select the `open-browser-toolbox` repository.
3. Review the changed files on the left.
4. Enter a short summary, for example:

```text
Improve image tools and mobile layout
```

5. Select **Commit to main**.
6. Select **Push origin**.

GitHub Pages will publish the new commit automatically from the selected branch.

## Troubleshooting

### The website shows a 404 page

Check all of these:

- The repository is named exactly `open-browser-toolbox`.
- The repository is public.
- Pages uses branch `main` and folder `/(root)`.
- `index.html` is in the repository root, not inside a second nested folder.

### GitHub Desktop shows no changed files

You may have selected the wrong folder. The selected repository folder must directly contain:

```text
index.html
README.md
assets
 tools
```

### A tool still shows an older version

Refresh the page once. If the installed/offline version is cached, close the site tab and reopen it. You can also clear the site's browser storage.

### The currency converter does not return a rate

It requires internet access to request reference rates from the external rate service. The remaining local calculators and text tools do not depend on that service.

### The QR generator does not load

It loads an open-source QR rendering library from jsDelivr. Check the connection or browser content-blocking settings.
