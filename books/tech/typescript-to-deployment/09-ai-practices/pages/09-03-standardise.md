## What to standardize

- Standardize what causes divergence. **Leave the rest alone**, because a team that is told which editor to use stops listening to the rules that matter

### Standardize

| Thing | Why |
|---|---|
| **`AGENTS.md`** | it is the shared context. One file, in the repo, reviewed |
| **the checks** | types, lint, tests, CI. Non-negotiable |
| **the review standard** | size limits, the triage tiers, what blocks |
| **the permission policy** | what agents may run unattended, and what needs approval |
| **the dependency policy** | a human approves every new one |
| **the spec habit** | when a spec is required, and where it lives |

### Leave free

- **Which tool and which model.** They change monthly, and preference is real. What matters is the output meeting the standard
- **How much someone delegates.** Some people work better with more, some with less
- **Personal prompts and shortcuts.** Share them, do not mandate them

### The line

- **Standardize the output and the guardrails. Leave the method free**
- Every rule about method costs goodwill and buys little, and goodwill is what makes the rules about output stick

### Making the shared context real

- **`AGENTS.md` is reviewed like code**, in a pull request, by the team
- **When someone finds a rule that fixes a repeated mistake, it goes in the shared file**, not in their personal config
- **A quarterly prune.** Delete stale rules, delete anything a check now enforces
