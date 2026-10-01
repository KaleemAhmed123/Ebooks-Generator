## Multimodal evaluation

- You cannot ship what you cannot measure. Multimodal benchmarks each probe a *different* capability, and picking the wrong one hides the failure that will hurt you in production. **[VERIFY current leaderboards]**

| Benchmark | Tests | Use it when |
|---|---|---|
| **MMMU** | College-level reasoning across 30 subjects (diagrams, formulas) | You need hard multi-discipline reasoning |
| **DocVQA** | Question-answering over document images | Your product reads forms/reports |
| **ChartQA** | Reading and reasoning over charts | Dashboards, analytics, figures |
| **TextVQA / OCR-bench** | Reading text embedded in scenes | Signs, labels, screenshots |
| **MathVista** | Visual math and geometry | STEM/education tasks |
| **MMBench / MME** | Broad perception + reasoning suite | General capability sanity check |
| **Video-MME / MVBench** | Video understanding | Anything temporal |

<svg viewBox="0 0 360 74" role="img" aria-label="Different benchmarks probe reasoning, documents, charts, OCR, and video separately" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="20" width="60" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="34" text-anchor="middle">MMMU</text><text x="38" y="45" text-anchor="middle" font-size="5.5" fill="#6b6b6b">reasoning</text>
  <rect x="76" y="20" width="60" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="106" y="34" text-anchor="middle">DocVQA</text><text x="106" y="45" text-anchor="middle" font-size="5.5" fill="#6b6b6b">documents</text>
  <rect x="144" y="20" width="60" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="174" y="34" text-anchor="middle">ChartQA</text><text x="174" y="45" text-anchor="middle" font-size="5.5" fill="#6b6b6b">charts</text>
  <rect x="212" y="20" width="60" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="242" y="34" text-anchor="middle">OCRBench</text><text x="242" y="45" text-anchor="middle" font-size="5.5" fill="#6b6b6b">text-in-image</text>
  <rect x="280" y="20" width="72" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="316" y="34" text-anchor="middle">Video-MME</text><text x="316" y="45" text-anchor="middle" font-size="5.5" fill="#6b6b6b">video</text>
</svg>

- **Benchmarks lie by omission.** A model topping MMMU may still misread your invoices, because MMMU is not DocVQA. Always evaluate on a **held-out set from your own data** — the only benchmark that predicts your production quality.

:::interview
"How do you evaluate a VLM for a document product?"

Don't trust a single leaderboard number. Match the benchmark to the capability (DocVQA/OCRBench for documents, not MMMU), then build a small labeled set from *your own* documents and measure exact-match/accuracy on it. Watch for hallucination specifically (next page) — a model can score well on accuracy yet confidently invent fields, which is the failure that erodes user trust.
:::
