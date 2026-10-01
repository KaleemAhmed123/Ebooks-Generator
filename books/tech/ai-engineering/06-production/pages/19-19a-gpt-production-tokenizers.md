## GPT from scratch: production tokenizers

- You built BPE from scratch (19-18) to understand it. In production you use a *fast, battle-tested* implementation — and the choice of tokenizer has real consequences for cost, multilingual quality, and correctness.

:::mint
```python
# tiktoken (OpenAI) — fast Rust BPE, used by GPT models
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
ids = enc.encode("Hello, world! 🌍")        # round-trips any Unicode
assert enc.decode(ids) == "Hello, world! 🌍"

# Hugging Face tokenizers — for open models, ships WITH the model
from transformers import AutoTokenizer
tok = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B")
ids = tok.apply_chat_template(messages, add_generation_prompt=True)  # MUST match training
```
:::

- **Use the model's own tokenizer, exactly.** A model was trained with a *specific* tokenizer and chat template; using a different one — or hand-rolling the chat format — silently degrades everything (19-26). `apply_chat_template` gives you the exact format the model expects. This is the #1 quiet bug when self-hosting open models.
- **Tokenization has cost and fairness consequences.** The same text is more tokens in some languages than others (English is dense in most tokenizers; many non-Latin scripts inflate), so non-English users pay more per character and hit context limits sooner — a real cost and equity issue. Vocabulary size also trades off: bigger vocab = fewer tokens per text (cheaper) but a larger embedding table.

:::note
The from-scratch build (19-18) taught you *what* BPE does; production teaches you *which* tokenizer and to use it *exactly right*. The recurring lesson: the tokenizer is not an interchangeable detail — it's coupled to the model, and the two most common tokenizer bugs (a mismatched tokenizer/chat-template silently degrading a self-hosted model, and under-budgeting non-English token counts) both come from treating it as an afterthought. Understanding the mechanism from scratch is what lets you recognize these as tokenizer problems rather than mysterious quality or cost issues.
:::
