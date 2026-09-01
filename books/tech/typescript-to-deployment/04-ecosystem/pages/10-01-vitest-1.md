# Module 10 - Testing

## Vitest

- A test suite exists so a change can be made without reading the whole codebase to find out what it broke
- That only works if running the suite is fast enough to do constantly. A suite that takes four minutes gets run once a day, and stops catching anything
- A **test runner** finds test files, runs them, reports what failed, and provides the assertion and mocking tools
- Jest was the standard for years, and it predates both ES modules and TypeScript being normal
- Making it understand either means a transform step, which is the config file everyone copies and nobody understands
- Vitest runs on Vite's transform pipeline, so ESM and TypeScript work with no configuration at all
- Its watch mode reads the import graph and reruns only the tests your edit could have affected, which is what keeps the loop in seconds
- The API is deliberately close to Jest, so moving an existing suite is mostly changing imports
- Version 4.1.11

```bash
npm i -D vitest
```

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    coverage: { provider: "v8", thresholds: { lines: 70 } },
  },
})
```

```ts
import { describe, it, expect, vi, beforeEach } from "vitest"
