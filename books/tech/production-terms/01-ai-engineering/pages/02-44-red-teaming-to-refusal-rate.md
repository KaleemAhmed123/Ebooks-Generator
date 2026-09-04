## Red Teaming

Attacking your own system on purpose. Testing asks whether the system does what
it should; red teaming asks whether it can be made to do what it must not, which
requires trying rather than verifying.

The surfaces are distinct enough to attack separately.

| Surface | Looks for |
|---|---|
| Direct jailbreak | input that talks the model past its policy |
| Indirect injection | instructions hidden in a fetched page or document |
| Extraction | the system prompt, or another tenant's data |
| Tool misuse | reaching records the agent should never touch |

In a multi-tenant retrieval system, extraction ranks first: a success there is a
breach rather than an embarrassment.

**A session that ends without test cases was theatre.** Every finding gets
reduced to a minimal reproduction and added to the regression suite. Otherwise
the next session spends its budget rediscovering what this one already found.

## Refusal Rate

How often the system declines on policy grounds rather than for lack of
information. Both directions are failures, and most teams instrument only one.

Under-refusal is visible: a violation reaches a user and someone screenshots it.
Over-refusal is silent. An assistant that declines a routine billing question
files no incident. It loses the user, who quietly starts routing around the
tool.

<svg viewBox="0 0 460 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A band showing over-refusal on the left, a narrow usable middle, and under-refusal on the right; only the right-hand failure is visible on a safety dashboard">
  <rect x="4" y="16" width="150" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="79" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">over-refusal</text>
  <rect x="154" y="16" width="110" height="30" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="209" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">usable band</text>
  <rect x="264" y="16" width="150" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="339" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">under-refusal</text>
  <path d="M264 56 H414" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="339" y="70" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">only this half of the failure reaches a dashboard</text>
  <text x="79" y="70" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">this half leaves no trace</text>
</svg>

**Log the request and the triggering rule on every refusal, and read a sample
weekly.** The patterns are small: a keyword innocuous in your domain, a topic
scoped too broadly. Each fix recovers traffic you were losing with no signal
that you were losing it.
