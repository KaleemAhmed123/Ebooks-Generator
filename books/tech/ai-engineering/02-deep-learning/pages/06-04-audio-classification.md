## Audio classification

- **Audio classification** labels a sound clip: a spoken command ("stop"), an urban noise ("siren"), a bird species, a machine fault.
- The recipe reuses vision directly: turn the clip into a mel spectrogram, then run a CNN or a spectrogram transformer over it, exactly as if it were an image.
- Augmentation adapts too. **SpecAugment** masks random horizontal bands (frequencies) and vertical bands (time) of the spectrogram — the audio version of hiding image patches, and a strong regulariser.

<svg viewBox="0 0 320 92" role="img" aria-label="A mel spectrogram with some frequency and time bands masked out, fed into a CNN that outputs the label siren" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="18" width="90" height="52" fill="#3d6ea5" fill-opacity="0.5" stroke="#c9d6e5"/>
  <rect x="12" y="34" width="90" height="9" fill="#fff"/><rect x="55" y="18" width="12" height="52" fill="#fff"/>
  <text x="57" y="82" text-anchor="middle" fill="#6b6b6b">masked spectrogram</text>
  <path d="M108 44 L140 44" stroke="#1a1a1a" marker-end="url(#ac)"/>
  <rect x="146" y="30" width="50" height="28" rx="3" fill="#24405e"/><text x="171" y="48" text-anchor="middle" fill="#fff">CNN</text>
  <path d="M198 44 L228 44" stroke="#1a1a1a" marker-end="url(#ac)"/>
  <text x="270" y="48" text-anchor="middle" font-weight="bold">siren</text>
  <defs><marker id="ac" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- For pretrained backbones, models like **AST** (Audio Spectrogram Transformer) and the CNN-based PANNs, trained on Google's AudioSet, transfer to new sound tasks with little data — the transfer-learning story again.

:::note
Because a spectrogram is an image, you rarely start from scratch. Take a spectrogram model pretrained on a large sound dataset, fine-tune on your few labelled clips, and you have a strong classifier for a niche sound in an afternoon.
:::
