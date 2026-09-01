## Building the memory

- Working memory is the one that breaks first, because it grows on every turn and the window does not

### The standard shape

```ts
async function buildContext(conversationId: string, userId: string) {
  const facts  = await db.userFact.findMany({ where: { userId } })      // semantic
  const recent = await db.message.findMany({
    where: { conversationId }, orderBy: { createdAt: "desc" }, take: 20,
  })
  const summary = await db.conversation.findUnique({
    where: { id: conversationId }, select: { summary: true },           // compressed
  })

  return {
    system: `${SYSTEM}\n\nKnown about this user:\n${format(facts)}`,
    messages: [
      ...(summary ? [{ role: "user" as const, content: `Earlier: ${summary.summary}` }] : []),
      ...recent.reverse().map(toMessage),
    ],
  }
}
```
