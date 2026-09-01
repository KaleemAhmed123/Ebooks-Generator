## Keys, and where the call belongs

- An API key is a bearer credential. Anyone holding it can spend your money at your rate limit
- **The call belongs on the server, always.** A key shipped to a browser or a mobile app is a public key, whatever the environment variable is named
- This is the single most common and most expensive mistake in this area

```ts
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()          // reads ANTHROPIC_API_KEY
const openai = new OpenAI()             // reads OPENAI_API_KEY
```

- Both SDKs read the environment by default, which is the behavior you want. Passing the key inline invites it into a log or a commit

### Making a browser feature safe

- The browser calls **your** endpoint. Your endpoint authenticates the user, checks their quota, then calls the provider
- That endpoint is where rate limiting, budget checks and audit logging live, none of which can exist client-side

### The operational rules

- **A separate key per environment**, so a leaked staging key cannot touch production spend
- **A spend limit on every key** in the provider console. It is the only backstop against a loop that runs all night
- **Rotate on any suspicion**, and design for it: read the key from Secrets Manager at boot, covered in Booklet 8, rather than baking it into an image
- Never log a request body that carries a key, and never echo provider errors straight to a client
