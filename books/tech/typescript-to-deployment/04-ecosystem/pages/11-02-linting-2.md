### Biome 2.5.11

```bash
npx @biomejs/biome check --write .
```

- Linter and formatter in one Rust binary, roughly twenty times faster
- Replaces both ESLint and Prettier, at the cost of fewer rules and fewer plugins
- `oxlint` 1.80 is the other fast option, and is designed to run alongside ESLint rather than replace it

### Prettier and hooks

```json
{
  "lint-staged": {
    "*.{ts,js,json,md}": ["prettier --write", "eslint --fix"]
  }
}
```

```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

- `lint-staged` only touches staged files, so a commit is not held up by the whole repository
- Keep the hook fast. A slow pre-commit hook teaches people to use `--no-verify`
