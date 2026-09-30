# AI Engineering: From Scratch

## Vision-Language Models (VLMs)

Until 2021, computer vision models and text models lived in different universes. **CLIP (Contrastive Language-Image Pretraining)** forced them together. 

### The CLIP Breakthrough

OpenAI took 400 million noisy image-caption pairs from the internet. They trained an Image Encoder (a Vision Transformer) and a Text Encoder simultaneously. The objective: maximize the cosine similarity between an image's vector and its caption's vector, while pushing it away from every other caption in the batch (Contrastive Loss). 

The result was a shared mathematical space where the vector for the *word* "Dog" is physically right next to a *picture* of a Dog.

### Building a VLM (LLaVA)

Modern Multimodal LLMs like GPT-4V and open-source models like LLaVA are built using this CLIP foundation.
1. **The Vision Tower:** A frozen CLIP model processes the image into visual tokens.
2. **The Text Model:** A standard frozen LLM (like Llama 3) processes text.
3. **The Projection Layer:** A tiny, trainable neural network bridge that translates the visual tokens into the exact dimensional space the LLM understands.

You train *only* the bridge. Suddenly, the LLM can "see" because the image has been translated into its native language.
