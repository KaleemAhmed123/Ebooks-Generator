## The checks that have to be automatic

- Review does not scale with volume, and these are exactly the findings a tired reviewer skims past. **Every one of these belongs in CI, blocking**

```yaml
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with: { fetch-depth: 0 }

      - name: Secrets
        run: gitleaks detect --source . --redact --exit-code 1

      - name: Dependencies
        run: npm audit --audit-level=high

      - name: Licenses
        run: npx license-checker --production --onlyAllow 'MIT;ISC;Apache-2.0;BSD-2-Clause;BSD-3-Clause'

      - name: Static analysis
        uses: github/codeql-action/analyze@v3

      - name: Lockfile integrity
        run: npm ci --ignore-scripts && git diff --exit-code package-lock.json
```

| Check | Catches |
|---|---|
| **secret scanning** | keys in generated examples |
| **dependency audit** | known vulnerabilities |
| **license check** | the AGPL library nobody read |
| **static analysis** | injection, weak crypto, unsafe patterns |
| **lockfile diff** | a dependency added without the lockfile |
| **`--ignore-scripts`** | a malicious postinstall running in CI |
