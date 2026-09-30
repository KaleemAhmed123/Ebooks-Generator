## Audio-language models

- The vision playbook transfers straight to sound. Swap the ViT eye for an **audio encoder** and the same projector-into-LLM recipe gives a model that *hears*: it takes an audio clip plus a text prompt and answers.
- The audio encoder is usually a **Whisper** encoder (Booklet 2) or a self-supervised speech model. Audio is turned into a **spectrogram** (a time-frequency image of sound), patchified, and encoded — literally treating sound as a picture the ViT-style encoder reads.

<svg viewBox="0 0 360 88" role="img" aria-label="Audio becomes a spectrogram, encoded and projected into an LLM alongside text" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="30" width="44" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="30" y="48" text-anchor="middle" font-size="6">🔊 clip</text>
  <rect x="66" y="30" width="56" height="30" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="94" y="44" text-anchor="middle" font-size="6">spectrogram</text><text x="94" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">time×freq</text>
  <rect x="136" y="32" width="52" height="26" rx="3" fill="#a03050"/><text x="162" y="48" text-anchor="middle" fill="#fff" font-size="6">audio enc</text>
  <rect x="202" y="30" width="52" height="30" rx="3" fill="#24405e"/><text x="228" y="48" text-anchor="middle" fill="#fff" font-size="6">LLM</text>
  <rect x="268" y="34" width="84" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="310" y="48" text-anchor="middle" font-size="6">answer / describe</text>
  <path d="M52 45 L64 45" stroke="#888" marker-end="url(#al)"/><path d="M122 45 L134 45" stroke="#888" marker-end="url(#al)"/><path d="M188 45 L200 45" stroke="#888" marker-end="url(#al)"/><path d="M254 45 L266 45" stroke="#888" marker-end="url(#al)"/>
  <defs><marker id="al" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Beyond transcription.** Plain ASR (Whisper) only writes down words. An audio-LM *reasons about sound*: "is this cough wet or dry?", "what genre is this?", "how many speakers, and is anyone angry?", "summarize this meeting recording." It hears tone, music, and non-speech audio, not just words.
- The line runs from Qwen2-Audio to **Audio Flamingo 3 (AF3)** and the audio half of omni models — increasingly folded into the any-to-any models two pages back. **[VERIFY model names/versions]**

:::note
The unifying idea of this whole module lands here: *every* modality becomes tokens for one transformer. An image is patch tokens, a video is sampled-frame tokens, audio is spectrogram tokens, and — next cluster — a robot action is an action token. Learn the pattern once and each new "X-language model" is just a new encoder feeding the same brain.
:::
