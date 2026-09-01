## The rules file

- **`AGENTS.md` at the repository root is the current convention**, read by more than thirty tools including Codex, Copilot, Cursor, Gemini CLI, Aider, Zed and Windsurf
- The format is stewarded by the Agentic AI Foundation at the Linux Foundation, which is what turned a per-tool file into one shared file
- It is plain Markdown. There is no schema to learn

```markdown
# AGENTS.md

## Project
Orders API. Node 24, TypeScript, Express 5, Prisma, PostgreSQL 18.
Monorepo: apps/api, apps/worker, packages/shared.

## Commands
- Install: `npm ci`
- Dev: `npm run dev` (needs `docker compose up -d db redis` first)
- One test: `npx vitest run path/to/file.test.ts`
- Types: `npx tsc --noEmit`
- Lint: `npx eslint . --fix`

## Conventions
- Validate every request body with Zod in `schemas/`. Never spread a body into a write.
- Errors: throw `AppError` from `packages/shared/errors`. Never `res.status(500).json(...)`.
- Logging: `logger` from `packages/shared/log`. Never `console.log`.
- Money is integer paise. Never a float.

## Do not
- Do not edit `packages/db/generated/**` (Prisma output).
- Do not add a dependency without asking.
- Do not change files under `legacy/`.

## Pull requests
- One concern per PR. Title `type(scope): summary`.
- Run types, lint and tests before proposing a diff.
```
