## Why attach metadata to chunks, and how does filtered retrieval work?

- Each chunk can carry **metadata**: source, date, author, document type, section, language, and — critically — **access tags** (which users/tenants may see it).
- Metadata enables **filtered (hybrid) search**: restrict the vector search to chunks matching a predicate *before or during* ANN, e.g. "only docs from this tenant, updated in the last year, of type 'policy'."
- Why it matters:
  - **Security / multi-tenancy** — never retrieve another tenant's or an unauthorised user's documents. This is an access-control boundary, not a nicety.
  - **Freshness** — prefer or require recent documents.
  - **Precision** — narrowing the candidate pool removes whole classes of irrelevant hits.
- Implementation note: pre-filtering (filter then search) vs post-filtering (search then filter) trades recall vs efficiency; good vector DBs support filtered ANN natively.

:::warn
Access control via metadata must be enforced at **retrieval**, not by asking the LLM to "only use authorised docs." If an unauthorised chunk reaches the prompt, it has already leaked.
:::

:::interview
What's really being tested: that metadata drives security (tenant/permission filtering), freshness, and precision — and that permission filtering is a hard retrieval-layer boundary.
:::
