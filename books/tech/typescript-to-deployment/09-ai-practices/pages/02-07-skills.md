## Loading knowledge on demand

- Some knowledge is needed occasionally: how to run a database migration here, how this payment integration works, the checklist for a release
- Putting it all in the rules file costs tokens on every request. Leaving it out means it is never known
- **The pattern is progressive disclosure: a short index the agent always sees, and full documents it loads when relevant**

```text
.claude/skills/
  release-checklist/SKILL.md
  payment-integration/SKILL.md
  database-migration/SKILL.md
```

```markdown
---
name: database-migration
description: Use when adding, changing or removing a database column or table.
---

# Migrations here

1. `npx prisma migrate dev --name <change>`
2. Expand before contract. Never rename in the same PR as the code change.
3. `CREATE INDEX CONCURRENTLY` on any table over 100k rows.
4. Set `lock_timeout`. See docs/tasks/migrations.md.
```

- **Only the name and description are always in context.** The body loads when the description matches what is being done
- That is the same idea as the tool search tool in Booklet 7, applied to knowledge instead of tools

### What makes a good one

- **The description is the trigger**, so it must say *when* to use it, not what it contains
- **One procedure per skill.** A skill covering four unrelated things matches badly and loads noise
- **Procedures, not explanations.** Steps, commands, and the specific traps in this codebase
- **The same discipline as the rules file applies**: if a check can enforce it, write the check instead
