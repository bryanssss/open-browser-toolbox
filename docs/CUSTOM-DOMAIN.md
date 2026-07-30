# Custom Domain Setup

OpenToolbox can use a GitHub Pages custom domain without changing the runtime architecture.

## Subdomain Example

For `tools.example.com`:

1. Copy `CNAME.example` to a new file named `CNAME`.
2. Put only this value inside it:

```text
tools.example.com
```

3. At the DNS provider, create a `CNAME` record:

```text
Name: tools
Target: bryanssss.github.io
```

4. In GitHub, open **Repository → Settings → Pages**.
5. Enter `tools.example.com` in **Custom domain**.
6. Wait for DNS verification.
7. Enable **Enforce HTTPS**.

## Apex Domain Example

For `example.com`, follow GitHub Pages’ current apex-domain DNS instructions. GitHub may require several `A` and `AAAA` records. Confirm the values in GitHub’s official documentation before changing DNS because infrastructure values can change.

## Update SEO URLs

The generated project currently uses:

```text
https://bryanssss.github.io/open-browser-toolbox/
```

After moving to a custom domain, replace this base URL in:

- HTML canonical tags
- JSON-LD URLs
- `robots.txt`
- `sitemap.xml`
- `README.md`

Internal navigation uses relative paths and should continue to work without modification.

## Checks After Connecting the Domain

- Homepage opens over HTTPS
- Tool pages open directly
- CSS, JavaScript and images load
- Service worker registers
- Manifest is available
- `robots.txt` and `sitemap.xml` use the new domain
- GitHub Pages reports the domain as verified
