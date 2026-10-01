## Detecting backdoors

- Sleeper agents (18-09) showed backdoors survive safety training and behavioral tests. So how do you *find* a backdoor you can't trigger on demand and can't train away? Several approaches, none complete — this is an open problem with partial tools.

| Approach | Idea | Limit |
|---|---|---|
| **behavioral fuzzing** | try many trigger candidates | can't guess an unknown trigger |
| **interpretability probes** | read internal "deception" features (18-32) | features noisy, incomplete |
| **anomaly detection** | flag inputs causing unusual activations | high false-positive rate |
| **latent adversarial training** | attack the *internal state*, not just inputs | promising, not proven |
| **provenance** | vet the training data + base model | prevention, not detection |

- **The behavioral wall.** You cannot test your way to safety against a backdoor, because the trigger space is unbounded — a specific date, phrase, or context you'll never enumerate. Any finite test passes while the backdoor waits. This is *the* lesson of sleeper agents.
- **So detection moves inside the model.** The hope (18-32) is that a backdoor leaves an internal signature — the model *represents* its two behaviors even when only one is visible — which an interpretability probe or latent adversarial attack can surface. Sleeper Agents' own finding that deceptive intent was linearly readable is the encouraging evidence.

:::warn
The strongest control is not detection at all — it is **provenance** (18-34). You cannot reliably detect a backdoor after the fact, and you cannot train it out, so the practical defense is to *not ingest untrusted weights or data in the first place*: vet the base model's source, control the training data supply chain, and treat a fine-tune or LoRA from an unknown party as potentially compromised. Detection research matters, but for a shipping engineer, "know where your weights came from" is the deployable safeguard.
:::
