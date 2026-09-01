## Prompts as code

- A prompt built by concatenating strings across three files cannot be reviewed, diffed or rolled back
- When output quality drops after a deploy, the first question is which prompt changed, and there has to be an answer

```ts
// prompts/triage.ts
export const TRIAGE = {
  id: "triage",
  version: 4,
  system: `You are a support triage assistant...`,
  build: (ticket: string) => [{ role: "user" as const, content: ticket }],
}
```

```ts
logger.info({ promptId: TRIAGE.id, promptVersion: TRIAGE.version, usage }, "llm call")
```

### The rules

- **One module per prompt**, exporting an id, a version and a builder. Never a template literal inline in a route handler
- **Log the id and version on every call.** Without them, no output can be traced to the text that produced it
- **Bump the version on any wording change**, so a metrics dashboard can show quality before and against after
- **Never interpolate untrusted text into the system prompt.** User content goes in a user message, always

### Templating

- Plain template literals are enough for most cases and stay readable in a diff
- Reach for a templating library only when non-engineers edit prompts, and then keep the templates in the repo rather than a database
- **A prompt in a database is a deploy with no review.** If prompts must be editable at runtime, put an approval step in front of the change
