## What the agent is allowed to do

- An agent runs commands. **Its permissions are the actual security boundary**, and the default configuration is usually more permissive than anyone intended

### The tiers

| Tier | Contains | Policy |
|---|---|---|
| **read** | read files, search, run tests, type check | allow |
| **write local** | edit files, create files | allow, with git as the undo |
| **local side effects** | install packages, run migrations, docker | **ask** |
| **leaves the machine** | push, open a PR, comment, call an API | **ask** |
| **destructive** | `rm -rf`, `git push --force`, production credentials | **deny** |

```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Edit", "Bash(npm test:*)", "Bash(npx tsc:*)"],
    "ask":   ["Bash(npm install:*)", "Bash(git push:*)", "Bash(docker:*)"],
    "deny":  ["Read(./.env)", "Read(~/.aws/**)", "Bash(rm -rf:*)"]
  }
}
```
