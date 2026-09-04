## Guardrails

Checks that run outside the model, on the way in or the way out: PII redaction,
topic limits, schema validation, injection detection.

Outside is the entire point. Instructions inside a prompt are requests, not
controls — the model usually follows them, and an attacker's whole goal is to
produce the case where it does not. A rule that can be argued with is not a
security boundary. Separate code holds regardless of what text reached the
context.

| Input guardrail | Output guardrail |
|---|---|
| strip personal data, detect injection, reject out-of-scope | validate schema, scan for leaked data, apply policy |

**Nobody measures the false positives.** A filter that stops every violation by
also stopping legitimate requests looks perfect on the safety dashboard, because
that dashboard counts only what was blocked. Read a sample of
the blocked pile every week.

## Hallucination

Confidently generated content that is not true. The model repeatedly picks a
plausible next token; no step in that process checks the result against anything,
so fluency and accuracy come out of the same machinery and look identical from
outside.

A fabricated citation has the cadence of a real one because both were produced
the same way. The model holds no internal signal separating them, which is why
asking "are you sure?" buys nothing. This is not a defect being slowly repaired —
it follows from the mechanism, so the system around the model has to assume wrong
output will arrive.

**The acceptable rate is a product decision, not a technical constant.** A rate
that is fine for brainstorming is disqualifying for a legal filing. Grounding, citations, schema validation and abstention bound it. Nothing
removes it.
