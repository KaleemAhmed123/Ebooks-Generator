## Releasing from a Monorepo

Earlier in this module the monorepo solved building: shared code, one install,
cached tasks. It creates a second problem it does not solve, which is
**shipping**.

You changed `packages/ui`. Three applications depend on it. What version is it
now? Which applications need rebuilding? What goes in the changelog? Who
publishes it?

Doing that by hand works until about the fourth package, then stops.

### Changesets

The tool most monorepos land on. The idea is that **the person making the change
declares its impact, at the time they make it**, while they still remember what
they did.

```bash
pnpm changeset
```

It asks which packages changed, whether each is a patch, minor or major, and for
a one-line summary. It writes a small markdown file into `.changeset/` which you
commit alongside the code.

```markdown
---
"@acme/ui": minor
"@acme/icons": patch
---

Button now accepts a `loading` prop and shows a spinner.
```

That file is the unit of release. It gets reviewed in the pull request with the
code that caused it, which is the whole point: the reviewer can see whether
"minor" is honest.

When you are ready to release:

```bash
pnpm changeset version    # bumps every version, writes CHANGELOG.md, deletes the files
pnpm changeset publish    # publishes what actually changed
```

`version` does the dependency arithmetic for you. Bumping `@acme/ui` to 2.1.0
also bumps the `@acme/ui` dependency inside `@acme/web`, and bumps `@acme/web`
in turn.
