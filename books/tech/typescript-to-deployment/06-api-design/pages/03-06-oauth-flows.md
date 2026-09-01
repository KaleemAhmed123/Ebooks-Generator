## Which OAuth flow to use

| Flow | For | Status |
|---|---|---|
| **Authorization code + PKCE** | web apps, mobile apps, SPAs | the answer for anything user-facing |
| **Client credentials** | service to service, no user involved | correct and simple |
| **Device code** | TVs, CLIs, anything without a browser | correct for its niche |
| Implicit | SPAs, historically | removed. The token went through the URL |
| Resource owner password | first-party apps, historically | removed. It defeats the point of OAuth |

### What PKCE is for

- The authorization code arrives back through a browser redirect, which another app on the device can sometimes intercept
- **PKCE** closes that. The client invents a random `code_verifier`, sends its hash as `code_challenge` at step 2, and presents the original at step 5
- A stolen code is then worthless, because the thief does not have the verifier
- Originally for mobile, now recommended for **every** client including server-side web apps

### The checks that are not optional

- **`state`** is a random value you send and verify on return. Without it, an attacker can complete a flow in the victim's browser, which is CSRF on login
- **Exact redirect URI matching.** Wildcards let a token be redirected to an attacker's page
- **Verify the token, do not decode it.** For an ID token that means signature, `iss`, `aud`, `exp` and `nonce`

### OAuth 2.1

- A draft that consolidates current practice rather than adding anything new
- It makes PKCE mandatory, removes implicit and password grants, and requires exact redirect matching
- Following the table above already puts you where 2.1 lands
