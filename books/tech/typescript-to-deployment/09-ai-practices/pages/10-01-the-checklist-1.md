# Module 10 - Closing

## The adoption checklist

### Before increasing volume

- [ ] Tests run in under 30 seconds for a single file
- [ ] `tsc --noEmit` and lint run in seconds
- [ ] CI blocks on types, lint, tests, secrets, licenses and the dependency lockfile
- [ ] Strict TypeScript, and lint rules encoding the conventions

### Context

- [ ] `AGENTS.md` at the root, under 100 lines, reviewed by the team
- [ ] It names the narrow test command, the type command and the lint command
- [ ] It has a **do not** section: generated directories, legacy code, dependencies
- [ ] It is updated in the same pull request as a convention change

### Process

- [ ] A spec or a plan for anything above about three files
- [ ] A pull request size limit, enforced, with large ones sent back to split
- [ ] Review tiers, routed by CODEOWNERS
- [ ] A human approves every new dependency and every migration
