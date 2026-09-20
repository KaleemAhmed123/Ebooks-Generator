## Clarify the requirements

- When the prompt is "design a URL shortener", your first job is to constrain the universe. An enterprise shortener needs custom domains and analytics; a public shortener needs spam prevention and expiry. Do not guess which one you are building
- Ask questions to establish exactly **three functional requirements** (what the system does). Keep it small. Write them down. Then, explicitly name what is out of scope. Naming what you are *not* building proves you know how to limit scope creep
- Next, establish the **non-functional requirements** (how the system performs). These must be numbers, not adjectives. Ask about the read-to-write ratio, the expected daily active users (DAU), and whether the system must prioritise consistency or availability in a partition

| Adjective (Bad) | Number (Good) |
| :--- | :--- |
| "It should be highly available" | "We need 99.99% uptime, so we accept ~4 minutes of downtime a month" |
| "It must be fast" | "Reads must complete in under 50ms at the 99th percentile" |
| "It should handle a lot of traffic" | "We expect 10 million DAU, generating ~500 writes per second at peak" |

### The failure

- The failure mode is treating "scalable" or "robust" as requirements. These words mean nothing to a computer. An architecture cannot be evaluated against an adjective
- Without hard numbers for scale, latency, and throughput, you cannot make defensible trade-offs later in the interview. If you do not know the read-to-write ratio, you cannot know if you need a read-through cache

:::interview
**The constraint test**
Interviewers intentionally give vague prompts. They are waiting to see if you will extract the constraints or just blindly start building. A candidate who assumes the constraints fails the test.
:::
