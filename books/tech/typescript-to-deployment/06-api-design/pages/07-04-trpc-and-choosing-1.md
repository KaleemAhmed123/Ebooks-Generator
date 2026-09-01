## tRPC, and choosing between all four

### tRPC

- In a TypeScript monorepo where the same team owns both sides, a schema language is duplicated effort
- The types already exist. **tRPC** exports them directly, so the client is typed from the server with no code generation and no schema file

```ts
export const appRouter = router({
  getOrder: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => db.order.findUnique({ where: { id: input.id } })),
})

// client, fully typed, no generation step
const order = await trpc.getOrder.query({ id: "o_842" })
```

- It works only when both ends are TypeScript in one repository. That is the whole trade
