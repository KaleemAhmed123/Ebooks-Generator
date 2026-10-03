## The skill format

- A skill is, at its simplest, a Markdown file with a little structured **frontmatter** (metadata at the top) plus a body of instructions. Optional folders add scripts and resources.

:::mint
```markdown
---
name: pr-review
description: Review a pull request for correctness, tests, and style.
  Use when asked to review or check a PR or diff.
---

# Reviewing a pull request

1. Read the diff with the `git_diff` tool.
2. Check: does it have tests? Do they cover the change?
3. Flag correctness bugs first, style last.
4. Return findings as a numbered list, most severe first.
```
:::

- **The frontmatter is the index.** `name` and `description` are what the agent scans to decide whether a skill is relevant — so the `description` follows the same rule as a tool's (13-13): say *what it does and when to use it*. This short metadata is all the agent reads until it decides the skill applies.
- **The body is the know-how**, in plain instructions the model follows. It can reference bundled scripts (`scripts/lint.py`) the agent runs, and resources (`templates/report.md`) it fills in.
- **Progressive structure:** small skills are one file; large ones split into a short `SKILL.md` that *points to* deeper files the agent loads only if needed (next page). Keep the entry file lean.

:::note
The design echoes good tool schemas: a crisp, discoverable header (name + when-to-use) over an expandable body. The agent decides relevance from the header alone, then pulls the detail. Write the description as carefully as you would a tool's — a skill the agent never realizes applies is a skill that does nothing.
:::
