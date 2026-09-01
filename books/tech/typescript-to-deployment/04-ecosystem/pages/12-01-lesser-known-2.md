### autocannon 8.0.0

```bash
npx autocannon -c 100 -d 30 -m POST -b '{"total":500}' \
  -H 'content-type=application/json' http://localhost:3000/api/v1/orders
```

- Load testing without leaving the terminal. Reports latency percentiles, not just an average

### @faker-js/faker

```ts
import { faker } from "@faker-js/faker"

const seller = { name: faker.person.fullName(), email: faker.internet.email() }
```

- Realistic seed data, which surfaces the layout and validation bugs that `"test test"` never will
