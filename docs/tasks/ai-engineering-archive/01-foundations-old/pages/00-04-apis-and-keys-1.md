## API keys, secrets, and rate limits

- An **API key** authenticates your code to a remote service — it is a bearer token, meaning possession equals authorization. Anyone who has it can bill your account
- **Environment variable** — a key-value pair injected into a process at launch by the OS shell. The application reads it at runtime; the value never touches the source file
- Every LLM provider (Anthropic, OpenAI, Google, Mistral) uses the same pattern: HTTP POST with `Authorization` or `x-api-key` header, JSON body, JSON response

### The secrets flow

<svg viewBox="0 0 460 80" role="img" aria-label="Secrets flow: .env file loaded by python-dotenv into environment variables, read by code, sent as headers to the API" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="24" width="88" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="48" y="41" text-anchor="middle">.env file</text>
  <text x="48" y="64" text-anchor="middle" font-size="8" fill="#6b6b6b">.gitignore'd</text>
  <rect x="120" y="24" width="88" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="164" y="38" text-anchor="middle">Environment</text>
  <text x="164" y="50" text-anchor="middle">variables</text>
  <rect x="244" y="24" width="88" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="288" y="41" text-anchor="middle">Your code</text>
  <rect x="368" y="24" width="88" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="412" y="41" text-anchor="middle">API server</text>
  <path d="M92 38 L120 38" stroke="#1a1a1a" fill="none" marker-end="url(#a)"/>
  <path d="M208 38 L244 38" stroke="#1a1a1a" fill="none" marker-end="url(#a)"/>
  <path d="M332 38 L368 38" stroke="#1a1a1a" fill="none" marker-end="url(#a)"/>
  <text x="106" y="30" font-size="8" fill="#6b6b6b" text-anchor="middle">dotenv</text>
  <text x="226" y="30" font-size="8" fill="#6b6b6b" text-anchor="middle">os.environ</text>
  <text x="350" y="30" font-size="8" fill="#6b6b6b" text-anchor="middle">HTTPS + header</text>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

### Minimal working call (Anthropic Python SDK, as of September 2026)

:::mint
```python
import os, anthropic
client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
r = client.messages.create(model="claude-opus-4-5",
    max_tokens=256, messages=[{"role":"user","content":"Hello"}])
print(r.content[0].text)
```
:::
