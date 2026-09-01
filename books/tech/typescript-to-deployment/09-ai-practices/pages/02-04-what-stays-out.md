## What does not belong in it

- A rules file grows by accretion until nobody reads it and the agent follows none of it. **Most of what gets added should not have been**

### Keep out: anything the code already says

- A list of directories, an inventory of endpoints, a description of what a function does
- **The agent can read the code.** Duplicating it creates a second source of truth that goes stale within a month

### Keep out: anything a check could enforce

| Instead of writing | Add |
|---|---|
| "use single quotes" | a formatter |
| "do not use `any`" | `noImplicitAny` and a lint rule |
| "do not use `console.log`" | `no-console` in ESLint |
| "import from the package root" | an import lint rule |

- **A check is enforced. A rule is advisory.** The check also teaches humans, works offline, and never needs to be re-read

### Keep out: secrets, and anything sensitive

- The file is committed, shipped to a model, and often public. **No credentials, no internal hostnames, no customer names**

### Keep out: general software advice

- "Write clean code", "follow best practices", "consider edge cases". These change nothing and cost tokens on every request

### Keep out: history

- Why a decision was made belongs in an architecture decision record or in the commit message, linked if it matters
- **The rules file says what to do now**, not how the codebase got here

### The pruning habit

- **Review it when a convention changes, and delete on sight.** A stale rule is worse than a missing one, because it is followed confidently
