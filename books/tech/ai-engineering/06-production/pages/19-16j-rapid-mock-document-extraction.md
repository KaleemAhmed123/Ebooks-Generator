## Rapid mock: document extraction pipeline

- **Prompt:** "Extract structured data from millions of documents (invoices, contracts, forms)." **Clarify:** mixed formats (PDF, scans, images), high accuracy required, human-in-the-loop for low confidence, must handle new document types, auditable.
- This is a **VLM + structured output + confidence-gated review** pipeline — the document-QA flagship (Flagship 6) turned into a batch extraction system.

- **The pipeline.** Document → (OCR if scanned, or a VLM directly on the image, Flagship 6) → an LLM/VLM with **guided decoding** extracts the target schema (`{invoice_no, date, line_items[], total}`) → **validation** (does the math add up? are required fields present?) → **confidence gating**: high-confidence auto-accept, low-confidence to human review → the human corrections become training/eval data.
- **This runs on the batch tier** (17-43) — millions of documents, no user waiting, so it's a cheap async job, not interactive serving. Accuracy and cost-per-document matter; latency doesn't.

:::interview
"Extract structured fields from millions of mixed-format documents accurately."

A VLM-plus-validation batch pipeline. Handle format variety by using a **VLM directly on the page image** (Flagship 6) rather than brittle OCR-then-parse, extract the target schema with **guided decoding** so fields parse, then **validate** with business rules (totals add up, required fields present) — validation catches extraction errors structure alone can't. **Confidence-gate** to a human review queue for low-confidence docs, and feed corrections back to improve the model. Run it on the **batch tier** since nothing's interactive, optimising cost-per-document and accuracy. The signals: VLM-over-OCR for format robustness, validation as a first-class step, confidence-gated human review, and batch-tier economics.
:::
