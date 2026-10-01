## Fine-tuning: instruction SFT

- **Supervised fine-tuning (SFT)** is next-token prediction on `(instruction, response)` pairs formatted with a chat template. The one twist that matters: **mask the loss on the prompt** so the model learns to *produce* responses, not to predict the user's instructions.

:::mint
```python
def build_example(tokenizer, instruction, response, block=1024):
    prompt = f"<|user|>\n{instruction}\n<|assistant|>\n"
    full   = prompt + response + tokenizer.eos_token
    ids    = tokenizer(full).input_ids[:block]
    labels = ids.copy()
    p_len  = len(tokenizer(prompt).input_ids)
    labels[:p_len] = [-100] * p_len          # -100 = ignored by cross_entropy
    return {"input_ids": ids, "labels": labels}
```
:::

- **Loss masking is the whole trick.** PyTorch's `cross_entropy` skips positions labelled `-100`, so the gradient flows *only* from the response tokens. Train on the prompt too and the model wastes capacity learning to generate instructions — and can become worse at following them. Every SFT bug tracker has "forgot to mask the prompt" in it.
- **The chat template** (`<|user|>` / `<|assistant|>` markers) must match what you use at inference exactly — the model learns to respond *after* the assistant marker, so a mismatched template at serving time silently degrades everything. Use the tokenizer's built-in `apply_chat_template` in production.

- **LoRA for cheap SFT.** Full fine-tuning updates all weights; **LoRA** (Booklet 4) trains tiny low-rank adapters instead — 100× fewer trainable parameters, fits a big model on one GPU, and yields the swappable adapters that multi-LoRA serving (17-17b) hosts by the thousand.

:::warn
The subtle SFT failure is *catastrophic forgetting*: fine-tune too hard on a narrow dataset and the model loses general capability it had from pretraining — it gets great at your 500 examples and worse at everything else. Guard against it with a *low* learning rate (SFT LRs are ~10× smaller than pretraining), few epochs (often 1–3), a mix of general data alongside your task data, and — critically — an eval on *held-out general* tasks, not just your fine-tuning distribution, so you catch the regression before shipping.
:::
