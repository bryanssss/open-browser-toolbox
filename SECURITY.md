# Security Policy

OpenToolbox is a static, client-side browser application. Report security concerns privately through the repository owner’s GitHub contact options when disclosure could place visitors at risk.

Do not include real passwords, access tokens, private documents or personal data in public issues.

## Supported Version

The current `main` branch and the live GitHub Pages deployment are supported.

## Security Principles

- No application-server upload endpoint
- No authentication database
- Local processing for most tools
- External requests documented in the privacy page
- HTML output escaped before display where practical
- No `eval` or dynamic remote-code execution in the new tool engine
