## Text to speech

- **Text-to-speech (TTS)** is ASR reversed: text in, natural-sounding speech out. Modern TTS is convincingly human, with correct rhythm, stress, and intonation (together called **prosody**).
- The classic pipeline has two stages. An **acoustic model** turns text into a mel spectrogram (predicting the sound's shape). A **vocoder** turns that spectrogram into an actual waveform you can play.
- Splitting it this way lets each stage specialise: the acoustic model handles pronunciation and prosody; the vocoder handles fine audio texture.

<svg viewBox="0 0 330 82" role="img" aria-label="Text feeds an acoustic model that outputs a mel spectrogram, which a vocoder turns into a playable waveform" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="28" width="46" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="33" y="44" text-anchor="middle">text</text>
  <path d="M58 40 L84 40" stroke="#1a1a1a" marker-end="url(#ts)"/>
  <rect x="88" y="26" width="70" height="28" rx="3" fill="#24405e"/><text x="123" y="44" text-anchor="middle" fill="#fff">acoustic</text>
  <path d="M160 40 L186 40" stroke="#1a1a1a" marker-end="url(#ts)"/>
  <rect x="190" y="28" width="34" height="24" fill="#3d6ea5" fill-opacity="0.6"/><text x="207" y="66" text-anchor="middle" fill="#6b6b6b">mel</text>
  <path d="M226 40 L250 40" stroke="#1a1a1a" marker-end="url(#ts)"/>
  <rect x="254" y="26" width="64" height="28" rx="3" fill="#1a3a2a"/><text x="286" y="44" text-anchor="middle" fill="#fff">vocoder</text>
  <defs><marker id="ts" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Newer systems collapse the two stages, generating audio **tokens** directly from text with one model (built on the neural codecs a few pages ahead), which improves naturalness and enables voice cloning.

:::warn
The hard cases are not sounds but **decisions**: how to read "2026" (year or number?), "Dr." (doctor or drive?), where to pause, which word to stress. This text analysis (normalization) is most of the engineering; get it wrong and clear audio still says the wrong thing.
:::
