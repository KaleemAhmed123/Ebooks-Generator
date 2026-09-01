## Cost and limits in a team

- Every technique in this module multiplies token use. **Parallel agents, subagents, background runs and review bots each cost real money**, and it is easy to lose track of where it goes

### Where it actually goes

| Driver | Effect |
|---|---|
| **long sessions** | every turn resends the whole transcript |
| **large repositories** | more files read per task |
| **parallel agents** | linear multiplier |
| **subagents** | another multiplier on top |
| **the biggest model for everything** | the largest single lever |
| **a bloated rules file and many MCP servers** | a fixed tax on every request |

### The controls

- **A smaller model for mechanical work.** Renames, boilerplate and test scaffolding do not need the largest model
- **Short sessions.** One per task, ended when the task ends
- **A trimmed rules file and only the MCP servers you use.** Both are paid on every single turn
- **A per-run budget** where the tool supports one, so a runaway loop stops

### The comparison worth making honestly

- **Compare it to an engineer's hourly cost, not to zero.** A tool costing a few hundred a month against a salary is a straightforward calculation
- **Then check the second half:** is delivered work up, or only generated work? Module 9 covers measuring that

### The rate limit reality

- Heavy parallel use hits provider limits, usually at the worst moment
- **Know your team's limits and where they are shared.** One person running eight agents can throttle everyone else
- **Track spend per person or per team**, so the conversation is about a number rather than a feeling
