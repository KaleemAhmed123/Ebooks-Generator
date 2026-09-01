## Gates that run without being asked

- Instructions are followed most of the time. **A hook runs every time**, which is a different guarantee

### At the tool level

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": "npx eslint --fix $FILE && npx tsc --noEmit" }]
    }]
  }
}
```

- The agent edits a file, the check runs immediately, and a failure comes back as feedback it acts on
- **This closes the loop without depending on it remembering to run anything**

### At the commit

```bash
npx husky init
echo 'npx lint-staged' > .husky/pre-commit
```

```json
{ "lint-staged": {
  "*.ts": ["eslint --fix", "prettier --write"],
  "*": ["gitleaks protect --staged --redact"]
}}
```

- **Keep pre-commit fast.** A slow hook gets bypassed with `--no-verify`, and then it protects nothing
