## Deep mock: clinical assistant — safety and compliance

- This is where the regulated design earns its keep. Safety and compliance aren't a section — they're woven through, and the interviewer *will* probe them hard.
- **Patient-safety controls** (the harm here is physical, so these are non-negotiable):

| Risk | Control |
|---|---|
| hallucinated medication/dosage | drug database cross-check; flag anything not in the transcript |
| note contradicts patient history | consistency check against the record (RAG) |
| ASR mishears a drug name | confidence flags on medical entities for review |
| clinician rubber-stamps a bad draft | surface *what to check*, highlight low-confidence spans |
| wrong billing/diagnosis code | validate codes; show the evidence for each |

- **The design must fight automation bias** — the tendency of a reviewer to trust a fluent draft and sign without scrutiny. So the UI *highlights* what the model was uncertain about, *flags* every medication and code for explicit confirmation, and *shows the source* (the transcript span, the history entry) for each claim — making review active, not a rubber stamp. The safety of the *whole system* depends on the human review actually happening, so you engineer *for* it.
- **Compliance, concretely** (17-54): PHI encrypted in transit and at rest; a **zero-retention** or self-hosted model so PHI never trains a third party; complete **audit trail** (who accessed what, what the AI drafted, what the clinician changed); data **residency** per regulation; BAAs with every provider; role-based **access control** so a clinician sees only their patients.

:::interview
"How do you keep the AI from causing a patient-safety incident?"

Layer clinical-specific controls and *engineer for the human review*, because the human is the safety net. **Grounding + cross-checks**: flag any medication/dosage not present in the transcript, check the note against patient history (RAG), validate billing codes with evidence. **Fight automation bias**: the reviewer will trust a fluent draft, so the UI must *highlight low-confidence spans*, *force explicit confirmation* of every drug and code, and *show the source* for each claim — making review active, not a rubber stamp. **Never autonomous**: a licensed clinician signs and is accountable. And all of it inside a HIPAA boundary with zero-retention models, encryption, audit, and access control. The key insight: in a high-stakes regulated system, the AI's job is to make the *human's* review fast and safe — so you design the whole system around ensuring that review is real.
:::
