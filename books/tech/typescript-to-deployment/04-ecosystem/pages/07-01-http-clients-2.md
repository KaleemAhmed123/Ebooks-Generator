### undici 8.10.0, what `fetch` is built on

```ts
import { Agent, request } from "undici"

const agent = new Agent({ connections: 50, keepAliveTimeout: 30_000 })
const { statusCode, body } = await request(url, { dispatcher: agent })
```

- Import it directly when you need pooling control, a proxy, or the last few percent of throughput

### axios 1.20.0

```ts
const api = axios.create({ baseURL, timeout: 5000 })
api.interceptors.response.use(null, (err) => { log(err); throw err })
```

- Interceptors, automatic JSON, and it throws on a non-2xx, which many teams prefer
- Still the pragmatic choice when you want one configured client shared across a codebase

### ky 2.1.0 and ofetch 1.5.1

```ts
const order = await ky.post("orders", { json: payload, retry: 2 }).json()
```

- Thin wrappers over `fetch` that add retries, hooks and typed JSON in a few kilobytes
- The middle ground between raw `fetch` and axios
