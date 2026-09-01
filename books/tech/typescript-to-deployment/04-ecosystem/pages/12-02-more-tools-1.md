## More worth knowing about

### tsx and Node together

```bash
node --watch --env-file=.env src/index.ts
```

- On Node 24 this is `nodemon`, `dotenv` and `ts-node` in one line with nothing installed

### @total-typescript/ts-reset

```ts
import "@total-typescript/ts-reset"

const ids = orders.map((o) => o.id).filter(Boolean)   // string[], not (string | null)[]
```

- Fixes the standard library types TypeScript gets wrong, including `JSON.parse` returning `any` and `filter(Boolean)` not narrowing

### undici mock agent

```ts
import { MockAgent, setGlobalDispatcher } from "undici"

const agent = new MockAgent()
setGlobalDispatcher(agent)
agent.get("https://api.shiprocket.in").intercept({ path: "/orders", method: "POST" })
  .reply(200, { awb: "AWB123" })
```

- Mocks `fetch` with no extra dependency, since undici is already what `fetch` uses

### Bruno

- An API client like Postman, except the collection is plain text files in your repository
- Reviewed in a pull request, and no account or cloud sync required
