## How do you tell a deep net is overfitting, and what's your toolkit to fix it?

- **Sign:** training loss keeps falling while validation loss flattens then rises — the net is memorising, not generalising.
- The toolkit, roughly in order of leverage:
  - **More/better data** — the strongest fix; includes **augmentation** (label-preserving transforms: crops, flips, paraphrases).
  - **Early stopping** — halt at the validation minimum; cheap and almost always helps.
  - **Weight decay / L2** — penalise large weights.
  - **Dropout** — on smaller models and fine-tuning.
  - **Reduce capacity** — fewer layers/units if the model dwarfs the data.
  - **Transfer learning** — start from pretrained weights so you need less data.
- Match the fix to the cause: tiny dataset → data/augmentation/transfer; huge model → capacity/regularisation.

:::interview
What's really being tested:

that you diagnose from the loss-curve divergence and prioritise fixes by leverage (data first), not just recite "add dropout."
:::
