### otplib 13.5.0

```js
import { authenticator } from "otplib"

const secret = authenticator.generateSecret()
const uri = authenticator.keyuri(email, "Orders", secret)   // for the QR code
const ok = authenticator.verify({ token: req.body.code, secret })
```

- Time-based codes for two-factor, compatible with Google Authenticator and Authy
- Store the secret encrypted, and issue single-use recovery codes or a lost phone locks the account out

### Hosted options

- **Auth0**, **Clerk**, **WorkOS** and **Supabase Auth** remove the whole surface
- Worth it when social login, MFA, SSO and password resets are all in scope and none of them are your product
