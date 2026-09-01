## The tooling

- Every major tool now ships a version of this loop. **They differ in ceremony, not in idea**

| Tool | Shape |
|---|---|
| **GitHub Spec Kit** | a `/specify`, `/plan`, `/tasks` command flow over Markdown files |
| **AWS Kiro** | specs, design and tasks as first-class files in the editor |
| **Claude Code** | plan mode, plus plan and task files kept in the repository |
| **OpenSpec, BMAD, Tessl** | more structured, more process, aimed at teams |
| **Cursor, Antigravity** | plan and rules files, tightly bound to the editor |

### What they all give you

1. A specification file, reviewed before code
2. A plan derived from it, reviewed before code
3. A task list the agent works through
4. All three committed, so they are diffable and reviewable

### The version that needs no tool at all

```text
docs/tasks/payout-retries.md      # spec, plan, tasks, decisions
```

- **A Markdown file in the repository is most of the benefit.** It is reviewed in the pull request, it is versioned, and it works with every tool
- Adopt a framework when the team needs the shared structure, not because the flow requires one

### How to choose

- **Start with a file and a habit.** If it sticks, the tooling is a small step from there
- **A heavy process adopted before the habit fails**, because people route around ceremony they did not ask for
- The measure is simple: **are the specs being written, and is anyone reading them**
