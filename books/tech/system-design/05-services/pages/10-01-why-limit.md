## Why rate limit

- An API without limits is an API waiting to be taken down by a `while(true)` loop. Rate limiting protects your system from abuse (intentional or accidental), ensures fairness across all users, and controls infrastructure costs
- A limit restricts the number of actions in a short time frame (e.g., 10 requests per second) to prevent spikes. A quota restricts the total usage over a long time frame (e.g., 10,000 requests per month) for billing purposes
- You must decide what the "key" is for your limit:

| Rate Limit Key | Pros | Cons |
|---|---|---|
| **API Token / User ID** | Perfectly tracks exactly who is making the request | The user must be authenticated before you can limit them |
| **IP Address** | Works for unauthenticated routes (like the login page itself) | Shared IPs (NAT) mean you might accidentally limit an entire office |
| **Tenant / Workspace ID** | Ensures one customer account cannot starve another | Harder to implement if tenants have hundreds of sub-users |

### The failure

- The failure is keying your rate limit on IP address for mobile phone users. Cellular networks use Carrier-Grade NAT (CGNAT)
- This means 10,000 completely different people walking around a city might all share the exact same external IP address on their phones. If you set a rate limit of "10 requests per minute per IP", one aggressive user will cause you to accidentally block 9,999 innocent strangers. Always limit by API token or User ID when possible
