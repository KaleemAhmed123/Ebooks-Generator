## Deep mock: clinical assistant — architecture

- With requirements pinned, draw the pipeline. It composes ASR (Booklet 2), RAG over the patient record (Flagship 3), structured extraction (17-17a), and a mandatory human-review gate.

<svg viewBox="0 0 360 104" role="img" aria-label="Clinical pipeline: audio to ASR, RAG over patient history, LLM drafts a structured note with codes, safety checks, then clinician review and sign-off" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="20" width="40" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="28" y="31" text-anchor="middle">audio</text>
  <rect x="56" y="20" width="44" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="78" y="31" text-anchor="middle">ASR</text>
  <rect x="108" y="20" width="60" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="138" y="31" text-anchor="middle" font-size="5.5">RAG: history</text>
  <rect x="176" y="20" width="64" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="208" y="28" text-anchor="middle" font-size="5.5">LLM drafts note</text><text x="208" y="35" text-anchor="middle" font-size="5" fill="#6b6b6b">structured + codes</text>
  <rect x="248" y="20" width="54" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="275" y="31" text-anchor="middle" font-size="5.5">safety checks</text>
  <rect x="310" y="20" width="42" height="16" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="331" y="28" text-anchor="middle" font-size="5.5">clinician</text><text x="331" y="35" text-anchor="middle" font-size="5">signs</text>
  <path d="M48 28 L54 28 M100 28 L106 28 M168 28 L174 28 M240 28 L246 28 M302 28 L308 28" stroke="#888" marker-end="url(#cl)"/>
  <rect x="70" y="56" width="220" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="68" text-anchor="middle" font-size="6" fill="#24405e">crosscutting (all in the HIPAA boundary)</text><text x="180" y="80" text-anchor="middle" font-size="5.5">PHI encryption · audit log · access control · residency · zero-retention model</text>
  <defs><marker id="cl" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The flow.** Visit audio → **ASR** (medical-tuned, because generic ASR mishears drug names) → **RAG** pulls relevant patient history from the record → **LLM drafts** a structured note (SOAP format) with suggested billing/diagnosis codes via **guided decoding** → **safety checks** (drug-interaction flags, consistency with history) → the **clinician reviews, edits, and signs**.
- **Structured output is mandatory**, not optional — the note must fit a clinical schema and the codes must be valid, so guided decoding (17-17a) guarantees a parseable, schema-valid draft, with a free-text reasoning field where the model can be uncertain.
- **Everything runs inside the compliance boundary.** The whole pipeline is in a HIPAA-compliant environment (a BAA-covered cloud region or on-prem), the model is a **zero-retention** endpoint or self-hosted so PHI never trains a third-party model, and every access is logged.

:::note
Notice the human-review gate isn't a step *added* at the end — it's the *point* of the architecture. The LLM's job is to produce the *best possible draft* to make the clinician's review fast, and the safety checks (drug interactions, history consistency) exist to *surface risks to the reviewer*, not to auto-correct. This inverts the usual optimisation: you're not minimising human involvement, you're maximising the *quality and safety of the draft the human signs*. In regulated, high-stakes design, the AI's success metric is "how good is the draft the accountable human approves," and the whole system serves that.
:::
