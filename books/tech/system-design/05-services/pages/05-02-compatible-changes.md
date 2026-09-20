## Compatible vs breaking

- In a monolith, you can refactor a function signature and update all its callers in the same pull request. In microservices, the caller and the callee are deployed at different times. You must never make a breaking change

| Action | Status | Rule |
|---|---|---|
| **Add an optional field** | Safe | Old callers will not send it; you use a default |
| **Add a mandatory field** | Breaking | Old callers will not send it and will fail validation |
| **Remove a field** | Breaking | Callers expecting that data will crash |
| **Rename a field** | Breaking | To the computer, this is removing the old field and adding a new one |
| **Change a type** | Breaking | An integer becoming a float will break strict parsers |

- To survive backward-compatible changes, clients must implement the "tolerant reader" pattern. They must silently ignore fields they do not recognize, rather than throwing a validation error

### The failure

- The failure is a strict deserializer. The User service adds an optional `date_of_birth` field to its JSON response. This is a backward-compatible change
- The Order service has a strict JSON parser that throws a fatal error if it encounters an unmapped field. When the User service deploys, the Order service instantly crashes. (This problem is solved entirely by Protocol Buffers, which ignore unknown fields by design)
