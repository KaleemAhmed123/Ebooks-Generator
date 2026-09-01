## Testing against real dependencies

- A unit test with a mocked database proves that your mock behaves the way you told it to
- The bugs that reach production are rarely in the code the mock replaced. They are in the query, the unique constraint, the cascade delete, the missing index
- An **integration test** runs against the real dependency so those things are actually exercised
- The historic objection was setup. Everyone needed the right database installed, at the right version, in the right state
- Containers removed that objection. The test starts the real database itself, runs the real migrations, and throws it away afterwards
- The same problem exists in the other direction with outbound calls, where you cannot hit a payment provider from a test suite
- There the answer is to intercept at the network layer rather than mock the client, so the test does not care whether the code used `fetch` or `axios`

### testcontainers 12.1.0

```ts
import { PostgreSqlContainer } from "@testcontainers/postgresql"

let container, prisma

beforeAll(async () => {
  container = await new PostgreSqlContainer("postgres:17-alpine").start()
  process.env.DATABASE_URL = container.getConnectionUri()
  execSync("npx prisma migrate deploy")
  prisma = new PrismaClient()
}, 60_000)

afterAll(async () => {
  await prisma.$disconnect()
  await container.stop()
})
```

- Starts a real Postgres in Docker, runs your real migrations, throws it away afterwards
- Catches the things a mock never will: a unique constraint, a cascade delete, a transaction that deadlocks
- Raise the hook timeout. Pulling the image the first time is slow
