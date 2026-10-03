## Red-team tooling: garak

- **garak** (NVIDIA) is an open-source vulnerability scanner for LLMs — nmap for language models. It runs a library of **probes** (jailbreaks, prompt injection, data leakage, toxicity, hallucination) against a target and reports which ones landed. Verified against garak's docs.
- You point it at a target (an API model, a local Hugging Face model, or a REST endpoint), pick probes, and it produces a JSONL report of attack successes.

:::mint
```bash
# pip install garak
garak --list_probes                       # every available attack probe

# scan an OpenAI-compatible model with the DAN jailbreak + injection probes
garak --model_type openai --model_name gpt-4o-mini \
      --probes dan,promptinject \
      --report_prefix myscan
# -> myscan.report.jsonl : per-probe pass/fail with the exact attack prompts

# scan a local HF model with a single probe
garak -t huggingface -n meta-llama/Llama-3.1-8B-Instruct -p dan.Dan_11_0
```
:::

- **What the report gives you** is a per-probe *attack-success rate* — the fraction of that probe's attempts the model complied with. That is a concrete safety metric you can track across model versions, put a threshold on, and gate a release with.
- **Where it fits:** garak is the automated first pass of the red-team layer from page 18-15 — broad coverage of the known attack taxonomy, cheap to run, easy to wire into CI so every model or prompt change is re-scanned.

:::note
garak tests the *model*, not your whole *system*. A clean garak run means the base model resists the common attacks in isolation; it says nothing about your RAG pipeline leaking retrieved documents, your agent's tools being over-permissioned, or an injection in your specific data flow. Use it as the model-level regression gate, and pair it with system-level red-teaming (PyRIT, next page) and your own product-specific probes for the end-to-end picture.
:::
