## Frontier safety frameworks

- The frontier labs govern their most capable models with published **safety frameworks** — voluntary commitments that define capability thresholds, required evaluations before scaling, and what safeguards each threshold triggers. Three dominate as of 2026, structurally aligned though differently named. **[VERIFY versions/dates]**

| Framework | Lab | Threshold construct | Version |
|---|---|---|---|
| **RSP** (Responsible Scaling Policy) | Anthropic | AI Safety Levels (ASL-1…5+) | v3.0, Feb 2026 |
| **PF** (Preparedness Framework) | OpenAI | tracked-capability criteria | v2, Apr 2025 |
| **FSF** (Frontier Safety Framework) | DeepMind | Critical Capability Levels | v3.0, Sep 2025 |

- **They agree on the shape.** Each defines *tiers of dangerous capability*, *evaluations* run before a model scales past a tier, and *safeguards* required at each tier — most concretely for CBRN (chemical/biological/radiological/nuclear) uplift, cyber uplift, and AI-R&D acceleration. The names differ ("Capability Thresholds" vs "High Capability" vs "Critical Capability Levels"); the constructs are analogous.
- **OpenAI's five criteria** for whether a capability is *tracked*: plausible (a real threat model), measurable (empirically testable), severe (large harm), net-new (not a pre-existing risk scaled up), and instantaneous-or-irremediable (fast or unrecoverable). Capabilities meeting all five get tracked and gated.

:::note
For a production engineer these frameworks are not abstract governance — they decide *whether a model ships, in what form, and to whom.* A model that crosses a CBRN threshold triggers extra deployment safeguards, restricted access, or (for open weights) sometimes no release at all. Booklet 5 introduced these as agent-autonomy governance; here they are the *capability* gate. Knowing the three frameworks and that they converge structurally is a common senior-interview safety question.
:::
