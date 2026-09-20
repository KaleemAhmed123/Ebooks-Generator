## Choosing an ID format

- You must choose an ID format based on storage size, database write performance, and security

| Format | Storage Size | Time-Ordered? | Generated Where? |
|---|---|---|---|
| **AUTO_INCREMENT** | 64 bits (8 bytes) | Yes | Central Database |
| **UUIDv4** | 128 bits (16 bytes) | No (Random) | Application Code |
| **UUIDv7** | 128 bits (16 bytes) | Yes | Application Code |
| **Snowflake** | 64 bits (8 bytes) | Yes | Application Code |

- For modern greenfield projects, **UUIDv7** is the safest default. It solves the database page-splitting problem, avoids the complexity of Snowflake worker management, and hides your system's throughput

### The failure

- The failure is exposing a Snowflake ID publicly in your API and accidentally leaking business intelligence to your competitors
- A Snowflake ID contains the exact millisecond it was created. If a competitor creates an account on Monday and gets an ID, and creates an account on Friday and gets an ID, they can subtract the timestamps and know exactly how many accounts were created that week
- They can also extract the Worker ID and see exactly how many server instances you are running. If you use Snowflake IDs, consider encrypting them or hashing them before returning them to external users (e.g., Stripe's `cus_123abc` prefix format)
