## What's the difference between jailbreaking and prompt injection?

- They're often confused but have different **attackers** and **targets**.
- **Jailbreaking:** the **user** crafts a prompt to make the model violate its *own safety policy* — produce disallowed content (e.g. role-play tricks, "DAN", many-shot, encoding/obfuscation). The target is the model's alignment/guardrails.
- **Prompt injection:** a **third party** plants instructions in content the model will later read, to hijack the *developer's* application on behalf of (or against) the user — e.g. hidden text in a web page the agent browses. The target is the app's intended behaviour.
- Key distinction: jailbreaking is the *user vs the model's rules*; injection is *external data vs the system's control flow*. Injection is often more dangerous in agents because the user may be the **victim**, not the attacker.
- Defences overlap (classifiers, least privilege) but injection additionally demands treating all retrieved/tool content as untrusted.

:::interview
What's really being tested: crisp separation — who attacks whom. Jailbreak = user subverts safety; injection = untrusted content subverts the app, with the user as potential victim.
:::
