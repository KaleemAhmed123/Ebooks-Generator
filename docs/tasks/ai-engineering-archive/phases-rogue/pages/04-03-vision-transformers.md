# AI Engineering: From Scratch

## Vision Transformers (ViT)

For a decade, convolutions were considered mandatory for images. In 2020, the Vision Transformer (ViT) proved this wrong. If you have enough data, a plain text Transformer can beat the best CNNs on images.

### The Pipeline

A ViT throws away sliding windows entirely.
1. **Patch Embedding:** Cut the image into 16x16 patches. Flatten each patch and project it into a 1D token vector using a single linear layer.
2. **Flattening:** Treat the 196 image patches exactly like 196 words in a sentence.
3. **Positional Embedding:** Because Transformers have no concept of space, we add a learned "position" vector to each token so the model knows where the patch came from.
4. **Self-Attention:** Feed the sequence through standard Transformer encoder blocks. 

### Why did CNNs dominate for so long?

CNNs have strong "inductive biases" (priors about locality). Transformers have none. They have to learn from scratch that pixels next to each other are related. Initially, this meant ViTs required 300 million images to train. 

With modern techniques like **Masked Autoencoders (MAE)**—where the model learns by predicting the missing 75% of an image—ViTs can now be trained efficiently on much smaller datasets. They are the backbone of modern diffusion models, video understanding, and multi-modal LLMs.
