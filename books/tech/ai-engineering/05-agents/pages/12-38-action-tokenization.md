## Action tokenization

- A robot action is **continuous** — joint angles, gripper position, velocities — real numbers. An LLM predicts **discrete** tokens from a vocabulary. **Action tokenization** bridges the two so the same next-token machinery that writes words can command a motor.

### Binning: the simple way
- Take each continuous action dimension (say, "move gripper +3.2 cm in x") and **discretize it into bins** — e.g. 256 buckets across its range. "+3.2 cm" falls in bucket 197. Each bucket is a token. The model predicts action tokens exactly like word tokens; a decoder maps them back to real commands.

<svg viewBox="0 0 360 84" role="img" aria-label="A continuous action value is placed into one of 256 bins, each bin being a discrete token" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="60" y="20" text-anchor="middle" font-size="6" fill="#6b6b6b">continuous: +3.2 cm</text>
  <line x1="14" y1="34" x2="150" y2="34" stroke="#888"/><circle cx="104" cy="34" r="3" fill="#a03050"/>
  <text x="120" y="50" font-size="7">→</text>
  <g><rect x="150" y="28" width="14" height="12" fill="#dde" stroke="#fff"/><rect x="164" y="28" width="14" height="12" fill="#dde" stroke="#fff"/><rect x="178" y="28" width="14" height="12" fill="#a03050" stroke="#fff"/><rect x="192" y="28" width="14" height="12" fill="#dde" stroke="#fff"/><rect x="206" y="28" width="14" height="12" fill="#dde" stroke="#fff"/></g>
  <text x="185" y="54" text-anchor="middle" font-size="6" fill="#a03050">bin 197 = token</text>
  <text x="290" y="30" font-size="6">predicted like</text><text x="290" y="41" font-size="6">any word token</text><text x="290" y="52" font-size="6" fill="#6b6b6b">→ decode → motor</text>
</svg>

- **The flaw:** binning is coarse — 256 buckets cannot express fine, smooth motion, and each dimension is predicted independently, so correlated joints (a smooth arm sweep) come out jerky.
- **The upgrade:** flow/diffusion **action experts** (π0, next page) generate smooth continuous action *chunks* directly, instead of binning. They keep the VLM brain but replace the discretized action head with a small continuous generator — better dexterity, at more complexity.

:::interview
**"How does an LLM control a robot when its output is discrete tokens?"** Action tokenization. Discretize each continuous control dimension into bins and treat each bin as a vocabulary token, so the model predicts actions with the same next-token loss it uses for words. It works but is coarse and jerky; state-of-the-art VLAs replace the binned head with a flow-matching/diffusion action expert that outputs smooth continuous action chunks.
:::
