### Where it fits, and what it costs

| Layer | Catches |
|---|---|
| Vitest | logic |
| Testing Library | behavior |
| Storybook stories | states you would not have clicked through to |
| Interaction tests | behavior, in a real browser |
| Visual regression | anything that changed how it looks |
| Playwright | whether the real journey still works |

Storybook is a genuine cost: a second build, a second set of files to keep
current, and stories that rot when nobody updates them. It pays for itself on a
shared design system with several consumers, and it does not pay for itself on a
small application with one team and no reused components. Decide on that basis
rather than on whether it is standard.
