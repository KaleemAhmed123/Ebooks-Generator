## Whisper architecture

- **Whisper** (OpenAI, September 2022) is the ASR model most speech systems start from. It is a plain **encoder–decoder transformer** — the same shape as a translation model — fed mel spectrograms.
- The encoder reads a 30-second mel spectrogram into a set of features. The decoder writes the transcript token by token, attending to those features.
- What made it strong was data, not architecture: **680,000 hours** of weakly-labelled audio scraped from the web, across 99 languages. Scale bought robustness to accents, noise, and jargon.

<svg viewBox="0 0 330 90" role="img" aria-label="A mel spectrogram feeds a transformer encoder, whose features feed a transformer decoder that emits transcript tokens" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="30" width="40" height="30" fill="#3d6ea5" fill-opacity="0.6" stroke="#c9d6e5"/><text x="30" y="76" text-anchor="middle" fill="#6b6b6b">mel</text>
  <path d="M52 45 L78 45" stroke="#1a1a1a" marker-end="url(#wh)"/>
  <rect x="82" y="30" width="70" height="30" rx="3" fill="#24405e"/><text x="117" y="49" text-anchor="middle" fill="#fff">encoder</text>
  <path d="M154 45 L188 45" stroke="#1a1a1a" marker-end="url(#wh)"/>
  <rect x="192" y="30" width="70" height="30" rx="3" fill="#1a3a2a"/><text x="227" y="49" text-anchor="middle" fill="#fff">decoder</text>
  <path d="M264 45 L296 45" stroke="#1a1a1a" marker-end="url(#wh)"/><text x="312" y="49" text-anchor="middle">text</text>
  <defs><marker id="wh" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Special tokens make it **multitask**: the same model transcribes, translates speech to English, detects the language, and adds timestamps — chosen by the prompt tokens fed to the decoder.

:::warn
Whisper transcribes in fixed **30-second chunks** and, being generative, can **hallucinate** — inventing plausible words during silence or noise, or looping a phrase. For long audio you chunk and stitch; for reliability you pair it with voice-activity detection (later page) so it is not asked to transcribe silence.
:::
