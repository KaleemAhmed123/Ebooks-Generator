## Safety gate: the content classifier

- The gate's output layer (Flagship 12) screens the model's *response* against the policy — catching harm the model produced despite a clean input (a jailbroken generation, an obfuscated attack that slipped past input screening, 18-17). Built as an integratable component.

:::mint
```python
CATEGORIES = ["violence", "self_harm", "sexual", "illegal", "hate", "pii_leak"]

def classify_output(response, threshold=0.5):
    scores = safety_model.score(response, CATEGORIES)   # Llama Guard-style
    violated = {c: s for c, s in scores.items() if s > threshold}
    return {"safe": not violated, "violations": violated}

def gated_response(response):
    result = classify_output(response)
    if not result["safe"]:
        log_safety_event(result["violations"])           # feeds the safety metric
        return refuse("output_policy", result["violations"])
    return response
```
:::

- **Output screening is what defeats the encoding-gap jailbreaks** (18-17): an ASCII-art or translated attack that fooled the input filter still produces a *plainly harmful output*, which the content classifier reads and blocks. This is why screening both directions matters — the input filter and the output filter catch different attacks.
- **Per-category thresholds encode the stakes** (18-22): a strict threshold on severe categories (self-harm, illegal) where a miss is catastrophic, looser where over-blocking hurts UX. Every block feeds the safety metric (17-46) and the incident signal (17-52a), so you can see the block rate and catch an attack surge.

:::note
The content classifier completes the gate's defense-in-depth: input detector (injection, 19-60b) + constitution (behavior, next page) + output classifier (harm in the result). Each catches what the others miss — and the output classifier is the *last* line, the one that works regardless of how the harm got generated. Building it as a component with per-category thresholds and event logging (not a hard-coded check) is what makes it tunable to the product's risk profile and observable in production. A safety gate you can't tune per-category and can't see the block rate of is a black box you can't operate.
:::
