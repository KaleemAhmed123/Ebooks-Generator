### When to use context

- Context is appropriate for values that are **ambient** — they belong to no specific component tree but are needed throughout
- Theme, locale, authenticated user, feature flags
- Context is not appropriate for: list items, row data in a table, anything that changes frequently

- A context that changes on every keystroke re-renders every consumer on every keystroke
- Split high-change and low-change state into separate contexts
- Or use a library like Zustand with a selector so components subscribe only to the slice they read
