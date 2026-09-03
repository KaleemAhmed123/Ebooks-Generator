## Red Teaming

Deliberately attacking your own system to find failures before users or
adversaries do — jailbreaks, injections, data extraction, harmful output.

A structured session found three prompts that made an internal assistant reveal
another tenant's document titles. All three were retrieval filter bugs.

### How it works

Red teaming is attacking your own system on purpose, before someone else does it
either maliciously or by accident.

It differs from normal testing in intent. **Testing checks the system does what
it should. Red teaming checks it cannot be made to do what it should not** —
which requires actively trying rather than verifying.

The surfaces worth attacking:

| Surface | Looks for |
|---|---|
| Direct jailbreak | user input that bypasses policy |
| Indirect injection | instructions hidden in fetched content |
| Extraction | the system prompt, or another tenant's data |
| Tool misuse | reaching things the agent should not |
| Cost exhaustion | requests engineered to be expensive |

**Tenant isolation deserves particular attention** in a multi-tenant retrieval
system, because a successful attack there is a data breach rather than an
embarrassment.

### In practice

**Every finding becomes a permanent regression case.** That is what turns red
teaming from an event into a capability — otherwise each session rediscovers
what the last one found.

Run it on any significant change: new tools, a new model version, a prompt
restructure. Each of those can reopen something previously closed, and a one-off
exercise before launch has a shelf life measured in weeks.
