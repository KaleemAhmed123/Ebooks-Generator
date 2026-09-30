## Fine-tuning Whisper

- Whisper is strong in general but weak on your specifics: a rare accent, medical or legal jargon, a low-resource language, your product names. **Fine-tuning** adapts it with a small labelled set of your audio.
- You need audio paired with correct transcripts — often just a few hours moves accuracy a lot on a narrow domain.
- Full fine-tuning updates every weight and needs a big GPU. **LoRA** (Booklet 4) trains a tiny set of extra weights instead, cutting the cost to a single modest GPU while keeping most of the gain.

:::mint
```python
from transformers import WhisperForConditionalGeneration
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-small")
# freeze the encoder, fine-tune the decoder on your (audio, text) pairs
for p in model.model.encoder.parameters():
    p.requires_grad = False
# then run the standard training loop from Module 3
```
:::

:::warn
Fine-tuning narrows the model. Train hard on one accent and it can lose ground on others — the catastrophic-forgetting trap again. Keep a held-out set of *general* speech and check it after fine-tuning, so you see what you traded away, not just what you gained.
:::
