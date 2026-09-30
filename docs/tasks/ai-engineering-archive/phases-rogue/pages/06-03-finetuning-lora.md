# AI Engineering: From Scratch

## Parameter-Efficient Fine-Tuning (PEFT)

If RAG is for injecting new knowledge, fine-tuning is for changing behavior. You fine-tune when you want the model to output a very specific JSON schema 100% of the time, or when you want it to speak like a pirate.

### The Cost of Full Fine-Tuning

A 70-billion parameter model requires over 1.5 Terabytes of VRAM just to store the optimizer states during training. Full fine-tuning is financially impossible for most developers.

### LoRA (Low-Rank Adaptation)

Instead of updating all 70 billion weights, **LoRA** freezes the massive base model. It then injects tiny, trainable "rank decomposition matrices" alongside the frozen attention layers. 

During the forward pass, the input flows through both the frozen weights and the tiny LoRA weights, and their outputs are added together. 

Because the LoRA matrices are exponentially smaller (often just 1% of the base model size), you can fine-tune a massive LLM on a single consumer GPU in hours. At inference, you simply merge the LoRA weights back into the base model.
