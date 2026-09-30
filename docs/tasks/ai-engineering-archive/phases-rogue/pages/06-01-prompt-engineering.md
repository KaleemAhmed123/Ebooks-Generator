# AI Engineering: From Scratch

## Prompt Engineering & In-Context Learning

In the pre-LLM era, you trained a new model for every task. In the LLM era, you keep the model frozen and change the prompt. This is called **In-Context Learning**.

### Zero-Shot vs Few-Shot

- **Zero-Shot:** Asking the model to perform a task with no examples. It relies entirely on its pre-trained knowledge.
- **Few-Shot:** Providing 2 to 5 examples of the exact input-output format you expect. This drastically reduces formatting errors and aligns the model's tone to your specific use case.

### Chain of Thought (CoT)

LLMs cannot "think" silently before they speak. If you ask a complex math question, and the model must output the final answer immediately, it will often fail. 

**Chain of Thought** forces the model to generate its step-by-step reasoning *before* emitting the final answer. Because the model attends to its own generated tokens, writing out the steps gives the attention mechanism the necessary scratchpad to arrive at the correct conclusion. Modern models often hide this CoT process in a separate `<thinking>` block.
