## Rapid mock: Copilot-scale code assistant

- **Prompt:** "Design an inline code-completion assistant (Copilot-style) for millions of developers." **Clarify:** completions as you type, *very* tight latency (a slow suggestion is useless), context is the open files, privacy of proprietary code, huge concurrent volume.
- The binding constraint is **latency under keystroke cadence** — a completion must arrive in a few hundred milliseconds or the developer has typed past it.

- **The design bends around speed.** A **small, fast model** (latency beats capability here) served with **speculative decoding** and **prompt caching** of the file context. **Debounce and cancel** aggressively — every keystroke would trigger a request, so cancel the in-flight completion on the next keystroke (the cancel discipline of 17-60a). **Fill-in-the-middle** (the model completes between prefix and suffix, not just append) is the model capability that makes inline completion work.
- **Privacy** — proprietary code can't leak, so self-host or a zero-retention endpoint in the customer's boundary; context is the open buffer, kept minimal to cut latency and exposure.

:::interview
"What dominates the design of an inline code assistant?"

Latency, absolutely — a completion later than the next keystroke is dead, so I optimise the whole path for TTFT: a **small fast model** (capability yields to speed), **speculative decoding**, **prompt-caching** the file context, and **aggressive debounce + cancel-on-keystroke** so I'm not paying for completions the developer already typed past. The model needs **fill-in-the-middle** (complete between prefix and suffix). And **privacy** — proprietary code stays in the customer boundary (self-host / zero-retention). The tell: naming latency as *the* constraint and cancel-on-keystroke as the volume/cost lever, rather than reaching for the biggest model.
:::
