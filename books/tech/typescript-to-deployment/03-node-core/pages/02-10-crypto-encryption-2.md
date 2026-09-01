### The three rules

- **Use GCM, not CBC.** GCM is authenticated, so tampering fails at `final()` rather than silently decrypting to garbage
- **A fresh random IV per message, never reused.** Reusing an IV with the same key breaks GCM completely. It is not secret, so store it alongside the ciphertext
- **Store the auth tag.** Without it there is nothing to verify against

### Deriving a key from a password

```js
import { scrypt } from "node:crypto"
import { promisify } from "node:util"

const key = await promisify(scrypt)(passphrase, salt, 32)
```

- A passphrase is not a key. `scrypt` and `hkdf` stretch it into one, deliberately slowly
