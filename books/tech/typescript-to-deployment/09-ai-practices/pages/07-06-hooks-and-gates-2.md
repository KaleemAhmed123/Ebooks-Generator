### At the pull request

| Gate | Blocks |
|---|---|
| types, lint, tests | the obvious |
| secret and license scan | Module 6 |
| **CODEOWNERS on `package.json`** | a dependency added without a human |
| **CODEOWNERS on migrations** | a schema change without a human |
| a diff size warning | a pull request nobody will really review |

### The principle

- **Fast and local first, slow and remote last.** A check that runs in the editor is worth ten that run in CI, because it is acted on rather than queued
- **Every gate applies to everyone.** A pipeline agents can skip is not a pipeline
