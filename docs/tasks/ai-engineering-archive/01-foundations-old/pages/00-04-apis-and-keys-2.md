### Rate limits and retry pattern

- Rate limits are expressed as **requests per minute (RPM)** and **tokens per minute (TPM)**. Exceeding either returns HTTP 429
- The correct response to 429: **exponential backoff** — wait 2^n seconds before retrying, with jitter. Retry immediately on 429 thunders the endpoint and makes the problem worse

:::mint
```python
import time, random
for attempt in range(5):
    try: return call()
    except RateLimitError:
        time.sleep(2**attempt + random.random())
```
:::

:::warn
Never commit `.env` to git. If you do, the key is compromised — rotate it immediately even after deleting the file. Git history preserves the commit; the key is already public. Use `git filter-repo` or GitHub's secret scanning alert to confirm exposure.
:::
