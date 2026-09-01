### 3. Verify provenance

npm **provenance** creates a publicly verifiable link between a published
package and the exact source commit and CI run that built it. It uses Sigstore:
short-lived certificates issued against an OIDC token from the CI provider, and
an append-only public transparency log.

Publishing with it needs npm 9.5.0 or later, a cloud-hosted GitHub Actions or
GitLab CI runner, a public repository URL in `package.json`, and one flag.

```yaml
- run: npm publish --provenance --access public
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Checking it on the way in:

```bash
npm audit signatures
```

**Be precise about what this proves.** Provenance says "this tarball was built
from that commit by that workflow." It does **not** say the code is safe. If an
attacker owns the maintainer's GitHub account, they can commit malicious code
and it will get valid provenance. What provenance gives you is the ability to go
read the exact source that produced the bytes you installed, rather than trusting
that the published tarball matches the repository you browsed.
