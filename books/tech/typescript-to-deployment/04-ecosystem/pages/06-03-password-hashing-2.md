### argon2 0.45.1

```bash
npm i argon2
```

```ts
import argon2 from "argon2"

const hash = await argon2.hash(password, {
  type: argon2.argon2id,
  memoryCost: 19456,   // 19 MiB
  timeCost: 2,
  parallelism: 1,
})

const ok = await argon2.verify(hash, password)
```

- `argon2id` is the current recommendation, because it resists both GPU and side-channel attacks
- The parameters above are the OWASP baseline. Higher memory is the strongest lever
- The salt is generated and stored inside the hash string, so there is no second column

### bcryptjs 3.0.3

```ts
import bcrypt from "bcryptjs"

const hash = await bcrypt.hash(password, 12)
const ok = await bcrypt.verify(password, hash)
```

- Pure JavaScript, so no native build step, which is why it survives on serverless platforms
- A cost of 12 is the sensible floor today

### Choosing and migrating

- New systems, argon2id. Existing bcrypt, leave it alone unless you have a reason
- Migrate on login: verify with the old algorithm, then re-hash with the new one and store it
- Never truncate or pre-hash a password with MD5 first. That is a real pattern and it destroys the entropy
