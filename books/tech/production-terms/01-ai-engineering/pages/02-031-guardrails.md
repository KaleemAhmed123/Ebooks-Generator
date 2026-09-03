## Guardrails

Checks on input and output that run independently of the model: PII redaction,
topic limits, schema validation, injection detection.

An output filter caught a response containing a customer's phone number before
it reached the interface. Prompt instructions alone would not have stopped it.

### How it works

A guardrail is a check that runs **outside** the model, on the way in or the way
out. The reason it has to be outside is worth stating bluntly.

Instructions inside a prompt are requests, not controls. The model usually
follows them and sometimes does not, and an attacker's entire goal is to produce
the case where it does not. **A rule that can be argued with is not a security
boundary.**

| | Runs | Does |
|---|---|---|
| Input guardrail | before the model | strip personal data, detect injection, reject out-of-scope |
| Output guardrail | after the model | validate schema, scan for leaked data, check claims, apply policy |

Because they are separate code, they hold regardless of what the model was
persuaded to do by text that reached its context.

### In practice

Guardrails need their own measurement, which teams consistently forget.

A filter that blocks 100% of violations by also blocking 30% of legitimate
requests has made the product unusable — and nobody will notice from the safety
dashboard, because that dashboard only counts what was blocked.

Track false positives as deliberately as you track catches, and read a sample of
blocked requests every week. The blocked pile is where you find out whether the
guardrail is protecting the product or strangling it.
