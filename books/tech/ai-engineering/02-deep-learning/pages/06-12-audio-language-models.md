## Audio language models

- Once a codec turns sound into discrete tokens, audio becomes a language — and the transformer that predicts text tokens can predict **audio tokens** the same way.
- An **audio language model** is trained to continue a sequence of codec tokens. Prompt it with a few seconds of audio tokens and it generates what plausibly comes next, then the codec's decoder turns those tokens back into sound.
- This one idea unifies audio generation: continue a voice (TTS and cloning), continue music, or fill a gap — all as next-token prediction over audio tokens.

<svg viewBox="0 0 320 82" role="img" aria-label="Audio tokens feed a transformer that predicts the next audio tokens, which a codec decoder turns into a waveform" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#3d6ea5"><rect x="10" y="30" width="12" height="18"/><rect x="24" y="30" width="12" height="18"/><rect x="38" y="30" width="12" height="18"/></g>
  <text x="30" y="62" text-anchor="middle" fill="#6b6b6b">audio tokens</text>
  <path d="M54 39 L84 39" stroke="#1a1a1a" marker-end="url(#al)"/>
  <rect x="88" y="26" width="74" height="28" rx="3" fill="#24405e"/><text x="125" y="44" text-anchor="middle" fill="#fff">transformer</text>
  <path d="M164 39 L192 39" stroke="#1a1a1a" marker-end="url(#al)"/>
  <g fill="#1a3a2a"><rect x="198" y="30" width="12" height="18"/><rect x="212" y="30" width="12" height="18"/></g>
  <text x="212" y="62" text-anchor="middle" fill="#6b6b6b">predicted</text>
  <path d="M228 39 L252 39" stroke="#1a1a1a" marker-end="url(#al)"/>
  <path d="M258 39 Q266 27 274 39 T290 39" stroke="#1a3a2a" fill="none"/>
  <defs><marker id="al" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Because the tokens are stacked (RVQ), audio LMs often use two transformers: a big one over time steps, a small one over the codebook layers within a step (the Moshi design, next page).

:::note
This is the deep unification the whole series builds toward: text, images, and audio all become token sequences, all predicted by the same transformer. Master next-token prediction (Booklet 4) and you understand generation across every modality.
:::
