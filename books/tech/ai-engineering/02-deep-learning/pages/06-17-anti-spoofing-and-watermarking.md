## Anti-spoofing and watermarking

- As voice cloning got good, two defences became essential: detecting fake audio, and marking generated audio as synthetic.
- **Anti-spoofing** (or deepfake detection) is a classifier trained to tell real recordings from synthetic ones. It hunts for tell-tale artefacts a vocoder leaves behind — unnatural phase, spectral patterns, missing background texture.
- **Audio watermarking** hides an inaudible signal inside generated audio that a detector can later read, proving the clip was AI-made even after compression or re-recording.

<svg viewBox="0 0 320 78" role="img" aria-label="An audio clip is judged real or fake by a detector; separately, generated audio carries a hidden watermark" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M10 24 Q18 14 26 24 T42 24" stroke="#24405e" fill="none"/>
  <path d="M50 22 L78 22" stroke="#1a1a1a" marker-end="url(#aw)"/>
  <rect x="82" y="10" width="56" height="24" rx="3" fill="#24405e"/><text x="110" y="26" text-anchor="middle" fill="#fff">detector</text>
  <path d="M140 22 L166 22" stroke="#1a1a1a" marker-end="url(#aw)"/><text x="196" y="26" fill="#c0392b">real / fake</text>
  <path d="M10 60 Q18 50 26 60 T42 60" stroke="#1a3a2a" fill="none"/><circle cx="26" cy="60" r="9" fill="none" stroke="#c0392b" stroke-dasharray="2 2"/>
  <text x="150" y="64" fill="#6b6b6b">generated audio carries a hidden watermark</text>
  <defs><marker id="aw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
This is an arms race, and detection is losing the easy version: as generators improve, artefact-based detectors age fast and a detector trained on last year's fakes misses this year's. **Watermarking is more durable** because the generator cooperates — but only for models that choose to watermark. Neither is a guarantee; treat any single voice sample as unverified by default.
:::
