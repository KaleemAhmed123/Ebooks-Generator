## Secrets

- Two directions, and both are real

### Secrets going out

- An agent reads files to work. **A `.env` in the working directory is a file it may read and send to a provider**
- The same applies to a pasted log containing a token, a config file with a connection string, or a test fixture with a real key

| Defence | Does |
|---|---|
| **`.env` in the ignore files** | keeps it out of the tree it browses |
| **a tool-level deny list** | blocks reading `.env`, `*.pem`, `credentials` |
| **no production credentials on a developer machine** | the strongest version |
| **redact before pasting** | for logs and stack traces |

- **The best version is that there is nothing to leak.** Short-lived credentials from identity federation, as Booklet 8 describes, make a leaked developer credential expire on its own
