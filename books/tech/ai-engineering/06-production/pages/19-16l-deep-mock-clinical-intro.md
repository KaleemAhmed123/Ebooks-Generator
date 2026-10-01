## Deep mock: clinical assistant — requirements

- The rapid mocks compressed the framework; this one runs it *in full* on a hard, regulated design, the way a real 45-minute interview goes. **Prompt:** "Design an AI assistant that drafts clinical documentation from doctor-patient conversations."
- **Clarify first, and the answers reshape everything** — this is a *safety-critical, regulated* system, which changes every later decision.

| Clarify | Answer | Consequence |
|---|---|---|
| scale? | 50k clinicians, ~20 visits/day each | 1M docs/day → serious infra |
| latency? | draft ready ~30s after visit | not interactive — batch-ish |
| input? | audio of the visit | ASR + long transcript |
| output? | structured clinical note + codes | structured output, high accuracy |
| stakes? | **a wrong note is a patient-safety + legal risk** | human sign-off mandatory |
| compliance? | **HIPAA, clinical regulation** | PHI everywhere, audit, residency |
| data? | patient history available | RAG over the record |

- **The stakes answer is the design driver.** A wrong medication or diagnosis in a clinical note can harm a patient and create legal liability — so this system is *never* fully autonomous. It **drafts**; a clinician **reviews and signs**. Everything is built around making that review fast and safe, not around removing the human.
- **Compliance is an architecture input from minute one** (17-54): PHI (protected health information) flows through the whole pipeline, so data residency, encryption, audit logging, BAAs, and access control aren't features to add later — they constrain the model choice, the deployment region, and the logging design.

:::note
The opening move that signals seniority on a regulated design: recognize *immediately* that "stakes: patient safety" and "compliance: HIPAA" dominate, and state that the system is a **human-in-the-loop drafting tool**, not an autonomous one, before drawing a single box. A candidate who architects a fully-automated clinical note-writer has misunderstood the problem — in high-stakes regulated domains, the AI *assists a licensed human who remains accountable*, and the engineering is about making that assistance fast, accurate, and auditable. The requirements phase, not the architecture, is where this design is won or lost.
:::
