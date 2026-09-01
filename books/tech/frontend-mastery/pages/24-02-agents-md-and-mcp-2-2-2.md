### The workflow that actually works

The pattern reported consistently by teams: **give the agent a strong design
system, accurate implementation context, and clear quality standards.** Not "ask
AI to build a page."

Concretely, four things do most of the work:

1. A design system with real tokens, so there is one correct way to style.
2. `AGENTS.md`, so the standards are stated rather than inferred.
3. MCP for design and browser access, so it is reading rather than guessing.
4. **Tests that run automatically**, so "it works" is a verdict and not a claim.

The fourth is the load-bearing one. An agent that can run `pnpm test` and see it
fail will iterate to correct. An agent that cannot will confidently hand you
something broken.

### What you are still on the hook for

Review does not get easier because the code arrived faster. If anything the
opposite: AI-generated code is fluent and well-formatted, which makes it read as
more trustworthy than it is.

The four things to check every time:

- **Does the dependency it added exist and is it the right one?** Models
  hallucinate package names, and attackers register the hallucinated ones. That
  is a real attack, and the cooldown policy from Module 21 is your defense.
- **Are the auth and permission checks present?** A generated Server Action will
  frequently do the database write and skip the check.
- **Does it handle the failure case?** Generated code is optimistic by default.
- **Is it actually reachable?** Generated components are often correct and
  wired to nothing.

The stated shift in what senior means, taken from 2026 job descriptions: owning
ambiguous work, **verifying AI-assisted code**, and preventing regressions. The
writing is the part that got cheap. The judgement is the part being paid for.
