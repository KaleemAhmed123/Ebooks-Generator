### Middleware

- `wrapLanguageModel` wraps a model with behavior that runs on every call through it
- Built in: default settings, reasoning extraction, and a simulated streaming shim for models that cannot stream
- Your own middleware is the right place for a **cache lookup, a spend check or a redaction pass**, because it applies everywhere by construction

### The names are the point

- Application code asks for `"anthropic:chat"`, never for a version string
- **Switching model is then a one-line change in one file**, and an incident during a provider outage is a config edit rather than a deploy
