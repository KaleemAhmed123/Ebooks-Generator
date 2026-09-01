### The rules

- **`redact` before anything else.** Authorization headers and cookies in logs is the most common accidental secret leak in a backend
- **The route pattern, not the URL.** An id in the field creates one group per order and makes aggregation useless
- **Log the version.** "Did this start at 14:02" is answered by the deploy time, and only if the version is on the line
- **`pino` is the choice.** It is measurably faster than the alternatives because it serializes JSON directly, and Booklet 4 covers why that matters
