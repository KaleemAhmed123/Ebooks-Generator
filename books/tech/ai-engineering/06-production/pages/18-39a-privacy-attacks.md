## Privacy attacks on models

- Differential privacy (18-39) defends against a specific threat: that the *model itself* leaks its training data. Those threats are real, named attacks — knowing them tells you what DP is buying.

| Attack | Question it answers | Example |
|---|---|---|
| **membership inference** | "was this record in the training set?" | confirm a patient was in a medical dataset |
| **training-data extraction** | "regurgitate the training data" | prompt the model to emit verbatim PII/secrets |
| **model inversion** | "reconstruct a typical input for this class" | rebuild a face from a recognition model |
| **model stealing** | "clone the model via its API" | distil a competitor's model from queries |

- **Extraction is the scariest for LLMs.** Large models memorise rare sequences verbatim, and the right prompt can make them emit training data — a real email, an API key, a person's details that appeared once in the corpus. Demonstrated repeatedly on production models.
- **Membership inference is the privacy-regulation trigger.** Confirming someone's data was used to train a model can itself be a privacy violation (medical, legal), regardless of whether the content leaks — which is why "we trained on user data" carries obligations even without extraction.

:::note
These attacks are why privacy is a *model* property, not just a pipeline one (18-53 covers pipeline PII). DP-SGD (18-39) bounds membership inference and extraction with a mathematical guarantee; deduplication of training data reduces verbatim memorisation; output filters catch some leaks; and rate limits + watermarking raise the cost of model stealing. For a shipping engineer: if you fine-tune on sensitive data, assume extraction and membership inference are *possible*, test for verbatim regurgitation, and reach for DP when the data's sensitivity warrants the utility cost. "The model can leak what it trained on" is the threat these attacks make concrete.
:::
