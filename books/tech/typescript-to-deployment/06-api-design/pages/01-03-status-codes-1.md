## Status codes

- The status code is the only part of a response a client can rely on without parsing anything
- Getting it right is what lets a caller retry, alert or give up correctly, and returning `200` with an error inside makes that impossible

| Class | Meaning |
|---|---|
| 1xx | informational, rarely seen |
| 2xx | it worked |
| 3xx | look somewhere else |
| 4xx | the caller made a mistake |
| 5xx | you made a mistake |
