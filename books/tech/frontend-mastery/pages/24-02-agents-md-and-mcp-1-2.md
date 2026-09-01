## AGENTS.md and MCP - continued

```markdown
## Rules
- Server Components by default. Add "use client" only for state, effects,
  or event handlers, and push it as far down the tree as possible.
- Do not add `useMemo` or `useCallback`. The React Compiler is enabled.
- Styling is Tailwind utilities. Tokens live in `app/theme.css` under
  `@theme`. Never edit a `tailwind.config` file, we do not have one.
- Validate every external input with a Zod schema in `lib/schemas/`.
- Every interactive element needs an accessible name. `pnpm test:a11y` runs axe.

## Do not
- Do not add a dependency without asking. We have a cooldown policy.
- Do not touch `db/migrations/`.
- Do not write barrel files, they break tree shaking.
```
