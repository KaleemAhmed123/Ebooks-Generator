### 4. Automate updates, then actually gate them

Dependabot and Renovate both open pull requests for updates. The value is not
the pull request, it is what runs on it.

```json
// renovate.json
{
  "extends": ["config:recommended"],
  "minimumReleaseAge": "3 days",
  "packageRules": [
    { "matchUpdateTypes": ["patch", "minor"], "automerge": true,
      "matchCurrentVersion": "!/^0/" },
    { "matchDepTypes": ["dependencies"], "automerge": false }
  ],
  "vulnerabilityAlerts": { "minimumReleaseAge": null }
}
```

Renovate has its own `minimumReleaseAge`, and the last line is the important
nuance: a security patch should skip the cooldown, because there the risk of
waiting is higher than the risk of installing.

Auto-merging patch updates for dev dependencies behind a full test suite is
usually right. Auto-merging anything that ships to the browser usually is not.

### 5. Know what is in the build

A **software bill of materials** is a machine-readable list of every component
in a shipped artifact, in CycloneDX or SPDX format. It sounds like paperwork
until an advisory lands naming a package and a version range and someone asks
whether you shipped it.

```bash
npm sbom --sbom-format cyclonedx > sbom.json
```

Store it as a CI artifact next to the build. When the next `axios` happens, the
question "were we exposed, and in which release" becomes a grep instead of an
afternoon.
