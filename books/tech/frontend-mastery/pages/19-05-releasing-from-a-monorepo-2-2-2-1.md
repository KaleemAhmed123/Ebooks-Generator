### Fixed versioning versus independent

**Independent**, the default: each package has its own version. `@acme/ui` is at
3.2.0 while `@acme/icons` is at 1.0.4. Honest, and it means a consumer who only
uses icons is not asked to upgrade for a change that did not affect them.

**Fixed**: every package shares one version, and they all bump together.
Simpler to reason about, and how Angular and Babel ship. The cost is meaningless
releases, where a package with no changes gets a new version anyway.

```json
// .changeset/config.json
{
  "linked": [["@acme/ui", "@acme/icons"]],   // bump together, keep own numbers
  "fixed": [],
  "ignore": ["@acme/docs", "@acme/e2e"]      // never published
}
```

`ignore` matters more than it looks. Your documentation site and your test
package live in the workspace and should never reach npm.
