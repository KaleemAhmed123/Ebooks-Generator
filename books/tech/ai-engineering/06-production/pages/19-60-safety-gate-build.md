## Constitutional safety gate: build

- Assemble the layers into one gate. Each stage can short-circuit to a refusal, and the constitution is passed to the model as system rules.

:::mint
```python
def safety_gate(user_input, context, model, constitution):
    # layer 1: input screening
    if guard.classify(user_input).unsafe:
        return refuse("input_policy")
    if injection_detector.score(context) > THRESHOLD:      # untrusted content
        context = quarantine(context)                       # strip/flag, don't obey

    # layer 2: constitution as system rules (Constitutional AI, runtime)
    system = f"Follow these principles strictly:\n{constitution}"
    resp = model.chat([{"role":"system","content":system},
                       {"role":"user","content":user_input}], context=context)

    # layer 3: output screening (catches what slipped through)
    verdict = guard.classify(resp.text)
    if verdict.unsafe:
        return refuse("output_policy", category=verdict.category)
    return resp.text
```
:::

- **Input screening** blocks the obvious harmful request and *quarantines* untrusted context (injection detection, 18-19) — flagging or stripping it rather than letting the model obey embedded instructions.
- **The constitution** is injected as system rules the model self-checks against — the runtime form of Constitutional AI. **Output screening** is the critical last line: it inspects the *result*, so it catches harm produced despite the input passing (a jailbroken model, an obfuscated attack, 18-17) — the layer that defeats the encoding-gap jailbreaks input filters miss.

:::warn
Tune each layer's threshold to the stakes, and monitor the *whole gate's* false-positive rate — an over-strict stack refuses legitimate requests and users route around it or turn it off, which is a worse safety outcome than a calibrated one. The gate is not "set and forget": jailbreaks evolve, so the classifiers and constitution need updating, and the refusal eval (next page) must run continuously against a growing attack set. A safety gate that isn't re-tested against new attacks is decaying from the day you ship it.
:::
