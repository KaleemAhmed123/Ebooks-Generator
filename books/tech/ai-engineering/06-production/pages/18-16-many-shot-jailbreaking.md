## Many-shot jailbreaking

- **Many-shot jailbreaking** (Anthropic, 2024) exploits the thing that made long context valuable: in-context learning. Fill the prompt with *many* fabricated examples of the assistant happily answering harmful questions, then ask your real harmful question — and the model, pattern-matching the established dialogue, complies.
- The attack scales with context length: more faked examples → higher success. Long-context models are *more* vulnerable, precisely because they learn from more in-context examples.

<svg viewBox="0 0 360 90" role="img" aria-label="A prompt stuffed with many fake harmful Q and A pairs conditions the model to answer the final real harmful question" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="14" width="220" height="62" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="124" y="26" text-anchor="middle" font-size="6" fill="#a03050">context: many fabricated turns</text>
  <g font-size="5.5"><text x="24" y="40">Q: [harmful] → A: "Sure, here's how…"</text><text x="24" y="52">Q: [harmful] → A: "Certainly…"  ( ×128 )</text><text x="24" y="64">Q: [harmful] → A: "Of course…"</text></g>
  <rect x="248" y="30" width="98" height="30" rx="4" fill="#24405e"/><text x="297" y="42" text-anchor="middle" font-size="6" fill="#fff">real question</text><text x="297" y="52" text-anchor="middle" font-size="5.5" fill="#cdd">model complies →</text>
  <path d="M234 45 L246 45" stroke="#888" marker-end="url(#ms)"/>
  <defs><marker id="ms" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why it works:** in-context learning does not distinguish "examples of desired behaviour" from "examples of forbidden behaviour" — it just learns the pattern in the window. Enough faked compliant turns overwhelm the safety training, which was a much smaller signal by comparison. Success climbs predictably with the number of shots.
- **The uncomfortable tradeoff:** the capability (long context, strong in-context learning) *is* the vulnerability. You cannot remove the attack without removing the feature, so defences are mitigations: classifiers that detect the many-shot pattern, prompt-structure caps, and fine-tuning that hardens refusals against in-context pressure.

:::warn
Many-shot is the clearest case of a general law in this cluster: **new capabilities create new attack surfaces.** Longer context enabled better few-shot prompting *and* many-shot jailbreaking; tool use enabled agents *and* prompt injection; multimodality enabled vision *and* image jailbreaks (next page). Every capability jump reopens safety, which is why the red-team suite must be re-run against every new model — the exploit rides in on the same feature you shipped for.
:::
