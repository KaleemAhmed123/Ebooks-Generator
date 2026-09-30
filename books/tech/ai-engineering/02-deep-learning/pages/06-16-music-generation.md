## Music generation

- Music generation is audio-language modelling aimed at songs: prompt with text ("lo-fi hip-hop, rainy mood") or a melody, and the model generates audio.
- It rides the same stack as speech: a neural codec turns music into tokens, a transformer predicts them, the decoder renders sound. Meta's **MusicGen** and Google's **MusicLM** were the landmark open efforts.
- Music is harder than speech in one way: **long-range structure**. A song has a beat, a key, verses, and choruses that must stay coherent over minutes — far longer than a spoken reply.

<svg viewBox="0 0 320 76" role="img" aria-label="A text prompt describing a style feeds a music model that outputs a waveform with repeating structure" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="26" width="86" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="53" y="42" text-anchor="middle">"lo-fi, calm"</text>
  <path d="M98 38 L128 38" stroke="#1a1a1a" marker-end="url(#mg)"/>
  <rect x="132" y="24" width="64" height="28" rx="3" fill="#24405e"/><text x="164" y="42" text-anchor="middle" fill="#fff">music LM</text>
  <path d="M198 38 L226 38" stroke="#1a1a1a" marker-end="url(#mg)"/>
  <path d="M232 38 q6 -12 12 0 t12 0 t12 0 t12 0 t12 0" stroke="#1a3a2a" fill="none"/>
  <defs><marker id="mg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
Music generation is a live legal question, not a solved product. Models trained on copyrighted recordings raise unresolved rights issues over both the training data and the outputs; several commercial services face active litigation (as of September 2026). Before shipping generated music, check the model's training-data provenance and licence terms — the audio quality is the easy part.
:::
