## A repository an agent can navigate

- Everything that makes a codebase easy for a new engineer makes it easy for an agent, for the same reasons. **This is not extra work; it is the work you already should have done**

### What helps most

| Property | Why it matters to an agent |
|---|---|
| **predictable file naming** | it can find things by guessing correctly |
| **one concern per file** | it edits less and breaks less |
| **types at the boundaries** | a wrong change fails to compile |
| **colocated tests** | it finds the test for the file it changed |
| **a small number of ways to do each thing** | it copies the right pattern |
| **short files** | more of the relevant code fits in context |

### The pattern that works best

- **Give it a nearby example to copy.** "Add an endpoint like `apps/api/routes/orders.ts`" produces a far better result than any amount of description
- A codebase where every route, every service and every test looks alike is a codebase an agent gets right the first time
- **Consistency is worth more than elegance here.** Three competing patterns means it picks one at random

### What hurts

- **Deep inheritance and heavy indirection.** Following six layers to find the real implementation burns context and often fails
- **Dynamic magic**: string-keyed registries, runtime metaprogramming, implicit dependency injection. The compiler cannot see it and neither can the agent
- **Very large files.** A 3,000 line file cannot be held in context alongside everything else it needs

- **A codebase that is hard for an agent is usually hard for people too.** Treat agent confusion as a signal about the design
