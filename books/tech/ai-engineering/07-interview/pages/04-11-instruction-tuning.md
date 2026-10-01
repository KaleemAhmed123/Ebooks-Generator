## What is instruction tuning, and what does it actually change about a model?

- **Instruction tuning** is SFT on a diverse set of **(instruction, good response)** pairs across many task types — summarise, translate, classify, reason, chat.
- It doesn't teach much new *knowledge*; it teaches the model to **interpret a request as a request** and respond in the expected shape, rather than just continuing the text.
- Before it, a base model given "Translate to French: hello" might continue with more English examples (it's completing a pattern). After it, the model recognises the instruction and does the task.
- It's what turns a raw next-token predictor into something usable, and it **unlocks zero-shot generalisation** — tuning on many tasks lets the model follow instructions for tasks it never saw.

:::interview
What's really being tested:

that instruction tuning changes *behaviour/intent-recognition*, not knowledge, and is what enables zero-shot instruction following.
:::
