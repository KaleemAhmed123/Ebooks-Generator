## Linting and formatting

- Two tools get filed together and do unrelated jobs
- A **formatter** decides where whitespace goes. It has no opinion on whether the code works, and it ends style arguments in review
- A **linter** reads the code for patterns that are legal but wrong, and it can find real bugs
- The linting worth having is the kind that understands types, because that is what catches a promise nobody awaited
- A missing `await` is legal JavaScript. It silently returns a promise and produces an error somewhere else entirely
- Running either by hand means it does not happen, so both hang off a commit hook or CI
- The recent shift is that the Rust rewrites do both jobs in one binary, trading rule coverage for speed

### ESLint flat config

```js
// eslint.config.js
import js from "@eslint/js"
import ts from "typescript-eslint"

export default [
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: { parserOptions: { projectService: true } },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
  },
]
```

- `.eslintrc` is gone in ESLint 9 and later. Flat config is the only format now
- **`no-floating-promises` is the rule worth the whole setup.** It catches a missing `await`, which is the most common silent bug in async code
