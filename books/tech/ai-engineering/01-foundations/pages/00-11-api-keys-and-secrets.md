## API keys and secrets

- Much of modern AI work is **calling a model API** — sending text to a provider (OpenAI, Anthropic, Google) and getting a response. Access is authenticated with an **API key**: a secret string that also bills you.
- Leak that key and someone else runs up your bill or uses your access. Handling it correctly is not optional.

### The rule: keys live in the environment, never in code

:::mint
```bash
# .env  — a file that never enters git
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
```
```python
import os
key = os.environ["ANTHROPIC_API_KEY"]   # read from the environment, not a literal
```
:::

- Put the key in a `.env` file, add `.env` to `.gitignore`, and load it at runtime. The code references a *name*, never the secret itself.

### Two more habits

- **Rate limits and retries.** APIs cap requests per minute and return `429 Too Many Requests` when exceeded. Retry with **exponential backoff** — wait 1s, then 2s, then 4s — rather than hammering.
- **Rotate on leak.** If a key is ever exposed, revoke it in the provider's dashboard immediately. A key in a git commit is compromised even after you delete the line.

:::warn
Scanners crawl public GitHub for committed keys within minutes. A key pasted into code and pushed "just to test" is the most common way beginners get a surprise bill. The `.env`-plus-`.gitignore` habit from day one prevents it.
:::
