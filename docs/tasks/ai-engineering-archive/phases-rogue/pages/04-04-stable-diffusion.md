# AI Engineering: From Scratch

## Stable Diffusion

Training a generative model directly on 512x512 pixels is computationally ruinous. Stable Diffusion solves this via **Latent Diffusion**: it compresses the image, does the heavy lifting in a tiny latent space, and decompresses it back.

### The Pipeline

1. **VAE (Variational Autoencoder):** Compresses a 3x512x512 RGB image into a 4x64x64 latent tensor. This reduces compute by 48x.
2. **Text Encoder:** A frozen model (like CLIP or T5) turns your text prompt into embeddings.
3. **U-Net (The Denoiser):** Predicts the noise in the latent tensor. Crucially, it uses **Cross-Attention** at every layer to look at the text embeddings, steering the denoising process toward the prompt.
4. **Scheduler:** An ODE solver (like DPM-Solver) that steps backward through time, blending predicted noise out of the latent.

### Classifier-Free Guidance (CFG)

During training, the model drops the text prompt 10% of the time, learning to predict both *conditional* and *unconditional* noise.
At inference, we extrapolate: 
$\epsilon = \epsilon_{\text{uncond}} + w \times (\epsilon_{\text{cond}} - \epsilon_{\text{uncond}})$
Where $w$ (usually 7.5) forces the model to strongly obey the prompt.

### LoRA (Low-Rank Adaptation)

You don't need to retrain a 2-billion parameter model to teach it a new concept. LoRA injects tiny rank-decomposition matrices into the cross-attention layers. You can train a LoRA on 15 images of your dog in 10 minutes on a consumer GPU.
