## What belongs in it

- The test for every line: **would an agent get this wrong without being told, and does it matter?** If either answer is no, leave it out

| Section | Contains |
|---|---|
| **Project** | stack, versions, and the layout in three lines |
| **Commands** | install, dev, **run one test**, types, lint, build |
| **Conventions** | the choices a newcomer would get wrong |
| **Do not** | generated directories, legacy code, dependency policy |
| **Testing** | where tests live, what style, what needs a database |
| **Security** | what must never be logged, where secrets come from |
| **Pull requests** | commit format, size expectation, what to run first |

### The single highest-value line

```markdown
- One test: `npx vitest run path/to/file.test.ts`
```

- **An agent that can run one test iterates until it passes.** An agent that can only run the whole suite waits four minutes per attempt and gives up sooner
- The same applies to type checking. Fast, narrow commands change agent behavior more than any instruction about style
