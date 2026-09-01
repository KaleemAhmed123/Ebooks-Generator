### End-to-end types, without a code generator

If your backend is also TypeScript, the type can travel from the database to the
component without being written down twice. tRPC is the common way: the client
imports the **type** of the server router, so the compiler knows every procedure,
its input, and its output. Nothing is generated, nothing is shipped, and
renaming a field on the server is a red squiggle in the component.

```ts
// server
export const appRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ input }) => db.users.find(input.id)),
});
export type AppRouter = typeof appRouter;

// client
import type { AppRouter } from '../server/router';       // type-only import
const trpc = createTRPCClient<AppRouter>({ /* ... */ });

const user = await trpc.getUser.query({ id });           // fully typed both ways
```

For a REST or GraphQL backend the equivalents are generating types from an
OpenAPI document or a GraphQL schema. Same principle: the schema is the source
of truth, the types are derived, and a mismatch is a build failure.
