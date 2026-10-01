## Why is prompt injection especially dangerous for agents, and how do you contain it?

- A chatbot that gets injected just says something bad. An **agent** can *act* — call tools, send data, modify systems — so injected instructions become real-world actions. The blast radius is far larger.
- **Indirect injection** is the main threat: malicious instructions hidden in content the agent reads (a web page it browses, a document it retrieves, a tool result) that hijack its next tool call.
- The **lethal trifecta** makes it exploitable: access to (1) **private data**, (2) **untrusted content**, and (3) an **exfiltration channel** (ability to send data out). An agent with all three can be made to leak or act maliciously.
- Containment (defence-in-depth):
  - **Least privilege** — minimal tools, scoped permissions, break the trifecta (e.g. no outbound send if it reads untrusted content).
  - **Human approval** on irreversible/sensitive actions.
  - **Isolate untrusted content** and don't let it drive privileged calls unchecked.
  - **Sandboxing**, output filtering, injection classifiers, and tracing to detect abuse.
- No complete fix exists — you **limit what a hijacked agent can do**, not prevent hijacking entirely.

:::interview
What's really being tested: that agents turn injection into *actions*, the lethal-trifecta condition, and least-privilege + approval + isolation as containment — not a belief that a filter solves it.
:::
