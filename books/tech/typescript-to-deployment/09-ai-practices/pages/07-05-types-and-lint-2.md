### Lint rules worth having specifically for this

```js
rules: {
  "no-console": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unnecessary-condition": "error",
  "import/no-extraneous-dependencies": "error",
  "no-restricted-imports": ["error", { paths: [
    { name: "lodash", message: "Use the shared utils in packages/shared." },
  ]}],
}
```

- **`no-floating-promises` catches unawaited async work**, which is a frequent and silent generated bug
- **`no-restricted-imports` is how you enforce "use our helper, not that library"** without writing it in prose
- **`import/no-extraneous-dependencies` fails when an import has no matching dependency**, which catches a hallucinated package before it is even installed

### The habit

- **Every time an agent makes the same mistake twice, ask whether a rule could catch it.** Usually one can, and then it never happens again
