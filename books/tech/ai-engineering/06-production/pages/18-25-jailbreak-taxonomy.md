## A jailbreak taxonomy

- Pull the attacks into one map. A taxonomy is not trivia — it is the *coverage checklist* your red-team suite (and the safety capstone in Module 19) must exercise, and the vocabulary an interviewer expects.

| Family | Mechanism | Example | Primary defence |
|---|---|---|---|
| **role-play / persona** | reframe as fiction or an alter-ego | "DAN", "you are an actor…" | output screening, refusal hardening |
| **instruction override** | "ignore previous instructions" | classic direct injection | delimiting, privilege separation |
| **in-context conditioning** | many fake compliant examples | many-shot (18-16) | pattern classifier, prompt caps |
| **encoding / obfuscation** | hide intent in a form the filter misses | ASCII-art, base64, ciphers (18-17) | normalise + screen output |
| **low-resource / translation** | ask in a language safety-trained less | rare-language prompts | multilingual safety model |
| **indirect injection** | instruction in processed content | EchoLeak (18-18/24) | break the trifecta, least privilege |
| **automated / adaptive** | attacker LLM refines the attack | PAIR (18-15) | continuous red-team, monitoring |

- **The families share two roots.** Either they *exploit a capability* (long context → many-shot; multimodality → image jailbreaks; tool use → injection), or they *exploit the representation gap* between what the filter checks and what the model understands. Every new attack is a variation on one of these two.
- **Use it as coverage.** The taxonomy is the checklist: probe every family, track the attack-success rate per family over time, and re-run the whole suite on every model and prompt change.

:::interview
"Give me a taxonomy of jailbreaks and the one defence that covers the most."

Walk the families — persona, instruction override, in-context conditioning, encoding, low-resource, indirect injection, automated. Then the meta-point: no single defence covers them all, but **output-side screening** covers the most, because it checks the *result* regardless of how the input smuggled the intent past the input filter. Pair it with least-privilege/trifecta-breaking for injection, which output screening alone does not stop. Naming the two roots — capability exploitation and representation gap — shows you understand *why* the families exist.
:::
