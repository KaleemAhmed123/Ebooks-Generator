## Keeping context honest

- Every file in this module goes stale. A rules file written in March describes a codebase that no longer exists, and **the agent follows it confidently**
- Stale context is worse than missing context, because missing context makes the agent read the code

### The three that rot fastest

| File | Rots when |
|---|---|
| **commands** | a script is renamed, or the package manager changes |
| **conventions** | the team adopts a new pattern and updates only the code |
| **the do-not list** | a legacy directory is finally deleted |

### The practices that work

- **Update the rules file in the same pull request as the change.** A convention change that does not touch `AGENTS.md` is half a change
- **A CI check that the documented commands run.** If `npm run dev` is in the file, run it in CI. A broken documented command is a caught bug
- **Let the agent update it.** After a session where it got something wrong, ask it to add the missing rule. It usually writes a better one than you would, because it knows precisely what confused it

### Living specifications

- The emerging pattern is that **the agent updates the specification as it works**, so the document reflects what was built rather than what was planned
- It addresses the staleness problem directly, and it needs the same review as code. **An auto-updated document nobody reads is stale in a new way**

### The test

- **Hand the rules file to a new engineer and watch them follow it.** Every place they get stuck is a place an agent will guess
