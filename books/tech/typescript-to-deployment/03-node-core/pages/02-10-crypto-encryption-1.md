## Encryption and key derivation

- Hashing is one way. **Encryption** is two way, so the original can be recovered with the key
- Reach for it when data must be stored but stays readable to you: a stored API credential, a document at rest, a token you issue and later validate
- **Symmetric** encryption uses one key for both directions and is what almost every backend needs
- **Asymmetric** uses a public key to encrypt and a private key to decrypt, which is what TLS and JWT signing use

```js
import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto"

const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex")   // 32 bytes

function encrypt(plain) {
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", key, iv)
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()])
  return { iv, enc, tag: cipher.getAuthTag() }
}

function decrypt({ iv, enc, tag }) {
  const d = createDecipheriv("aes-256-gcm", key, iv)
  d.setAuthTag(tag)
  return Buffer.concat([d.update(enc), d.final()]).toString("utf8")
}
```
