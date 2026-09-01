### Why Vitest and not Jest

Jest, built at Facebook, defined this category and is still maintained at version 30. It has one structural problem: it was designed before ES Modules, and it runs your code through its own CommonJS transform. In a project built with Vite or ES Modules, that means maintaining a second, parallel build pipeline that exists only for tests, and reproducing every alias, plugin, and environment variable in it.

**Vitest reads your existing `vite.config.ts`.** Your aliases, plugins, and transforms are already correct because they are the same ones the application uses. There is no second pipeline to keep in sync.

The assertion API is deliberately Jest-compatible, so `describe`, `it`, `expect`, and the matchers are all identical. Migrating is mostly changing imports.

Jest is still the right answer for a large existing Jest suite that works. Vitest is the default for anything new.
