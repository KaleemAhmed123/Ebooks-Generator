### Parse, do not assert

A **schema** is a value that both describes the shape and can check it at
runtime. Zod is the common choice.

```ts
import { z } from 'zod';

const User = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
  role: z.enum(['admin', 'editor', 'viewer']),
  createdAt: z.iso.datetime().transform((s) => new Date(s)),
});

type User = z.infer<typeof User>;      // the type is derived, not written twice

async function getUser(id: string): Promise<User> {
  const res = await fetch(`/api/user/${id}`);
  if (!res.ok) throw new Error(`getUser failed: ${res.status}`);
  return User.parse(await res.json()); // throws here, at the boundary
}
```

Two things changed. The failure now happens **at the boundary**, with a message
naming the field, instead of six components deep in a render. And `type User` is
**derived from the schema**, so the type and the check cannot drift apart. There
is one source of truth.

Use `safeParse` where a bad response is expected rather than exceptional:

```ts
const result = User.safeParse(json);
if (!result.success) {
  reportToSentry(result.error.issues);
  return null;
}
return result.data;
```
