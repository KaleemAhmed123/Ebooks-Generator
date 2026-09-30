## Instruction tuning (SFT)

- **Supervised fine-tuning (SFT)** turns a base model into one that follows instructions. It is ordinary next-token training, but on a curated set of **instruction → response** examples instead of raw web text.
- The data is thousands to millions of pairs: a prompt and a high-quality answer, written or vetted by humans (or distilled from a stronger model).

:::mint
```
[system] You are a helpful assistant.
[user]   Summarise this email in one line: …
[assistant] The client approved the budget and wants a call Friday.
```
Tokens are wrapped in a fixed **chat template** with role markers. The model learns the template as part of learning to answer.
:::

- **Loss masking** is the key trick: compute the loss **only on the assistant's tokens**. The model is graded on its answer, not on reciting the user's question back. It learns to *produce* responses, not copy prompts.

<svg viewBox="0 0 320 44" role="img" aria-label="Loss is masked off on the prompt tokens and active only on the response tokens" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="16" fill="#eee" stroke="#999"/><text x="89" y="27" text-anchor="middle" fill="#6b6b6b">prompt — loss masked (ignored)</text>
  <rect x="164" y="16" width="140" height="16" fill="#eafaf0" stroke="#1a3a2a"/><text x="234" y="27" text-anchor="middle" fill="#1a3a2a">response — loss active</text>
</svg>

- SFT is cheap next to pretraining — hours to days on a few GPUs — and gets you 80% of the way to a usable assistant. Many production models are SFT-only, skipping RLHF entirely.

:::warn
SFT can only teach what your examples show. Narrow data makes a narrow model that parrots your examples' style and refuses anything unfamiliar. And SFT teaches the *format* of good answers, not the *judgment* of which answer is better — that gap is what the alignment stage (next pages) fills.
:::
