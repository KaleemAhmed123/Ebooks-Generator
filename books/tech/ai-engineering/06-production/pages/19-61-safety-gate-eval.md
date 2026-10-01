## Constitutional safety gate: refusal eval

- A safety gate you haven't measured is a guess. **Refusal evaluation** measures the two error rates that matter, against a labelled set of *should-refuse* and *should-allow* prompts (plus a jailbreak set).

:::mint
```python
def eval_gate(gate, should_refuse, should_allow, jailbreaks):
    # false negatives: harmful prompts the gate let through (the dangerous error)
    fn = sum(1 for p in should_refuse if not is_refusal(gate(p))) / len(should_refuse)
    # false positives: safe prompts the gate wrongly blocked (the UX error)
    fp = sum(1 for p in should_allow  if is_refusal(gate(p)))     / len(should_allow)
    # jailbreak resistance: attack prompts that still got through
    jb = sum(1 for p in jailbreaks    if not is_refusal(gate(p))) / len(jailbreaks)
    return {"miss_rate": fn, "over_block": fp, "jailbreak_success": jb}
```
:::

- **The two errors trade off** (18-22). *Miss rate* (false negatives) — harmful content that got through, the dangerous error. *Over-block* (false positives) — safe requests wrongly refused, the UX error that gets the gate disabled. You set the threshold on the stakes: strict where harm is severe, looser where over-blocking frustrates.
- **Jailbreak resistance is a moving target.** Test against the taxonomy (18-25) — role-play, many-shot, encoding, injection — and grow the set as new attacks appear; a gate that only blocks last year's jailbreaks is already behind (18-15's continuous-red-team point).

:::interview
"How do you know your safety gate actually works?"

Measure it, don't assume it. Against a labelled set, track three numbers: **miss rate** (harmful prompts that got through — the dangerous false negative), **over-block rate** (safe prompts wrongly refused — the UX false positive that gets the gate turned off), and **jailbreak success rate** across the attack taxonomy (18-25). These trade off, so I tune thresholds to the stakes and monitor them *continuously*, growing the jailbreak set as new attacks emerge (red-teaming is ongoing, not a launch gate). And I rely on **defense in depth** — input + constitution + output screening — because any single layer has a nonzero miss rate. The tell: naming both error types and treating the eval as a living, adversarial, continuously-updated measurement.
:::
