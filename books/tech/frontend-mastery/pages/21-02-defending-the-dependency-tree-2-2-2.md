### 6. Shrink what a compromised package can reach

Even a perfect dependency policy fails eventually. Reduce the blast radius:

- **`ignore-scripts=true` in `.npmrc`.** Most supply chain payloads run from a
  `postinstall` script. Turning lifecycle scripts off blocks that whole class.
  A few packages genuinely need them, so allowlist those.
- **Scope your CI tokens.** The build job needs read access to the repository.
  It does not need write access, package publishing rights, or cloud
  credentials. Split publish into its own job with its own narrow token.
- **Use OIDC trusted publishing** instead of a long-lived `NPM_TOKEN`. A token
  that does not exist cannot be stolen from a compromised runner.
- **Pin your GitHub Actions to a commit SHA**, not a tag. A tag can be moved.

```yaml
- uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0  # v7.0.0
```

### The checklist

| Control | Cost | Stops |
|---|---|---|
| `npm ci` in CI | none | silent version drift |
| One day cooldown | none | most malicious releases, before you see them |
| `ignore-scripts` | small | `postinstall` payloads |
| `npm audit signatures` | small | tarballs that do not match their source |
| SBOM per release | small | not knowing whether you were exposed |
| SHA-pinned actions | small | a moved tag in your CI |
| Scoped tokens, OIDC | medium | a compromised build stealing publish rights |
