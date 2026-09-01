## AGENTS.md and MCP - continued

```markdown
## Where things live
- `app/` routes, `components/ui/` design system, `lib/` shared logic
- New shared components go in `components/ui/` with a Storybook story
```

What makes one useful rather than decorative:

- **Commands, exactly.** The agent will guess `npm test` and be wrong.
- **Rules with the reason attached.** "No `useMemo`" alone gets ignored the
  moment the model pattern-matches on older training data. "No `useMemo`, the
  compiler handles it" survives.
- **A "do not" list.** Constraints are more useful than encouragement, because
  the model's default behavior is already to add things.
- **Keep it short.** Every line competes for attention with the actual task. A
  four-hundred-line standards document is worse than a forty-line one.

Tool-specific files still exist alongside it: `CLAUDE.md`, `.cursorrules`,
`.github/copilot-instructions.md`. The common pattern is one real `AGENTS.md`
and the others pointing at it.
