## Spectrograms and mel features

- Raw waveforms are hard to learn from directly — too long, and the meaning is hidden in frequencies, not raw amplitude. The fix is to convert sound into a picture of its frequencies over time.
- A **spectrogram** is that picture: time on one axis, frequency on the other, brightness showing how much of each frequency is present at each moment. It is built with the Fourier transform (Booklet 1) over short windows.
- The **mel spectrogram** warps the frequency axis to match human hearing — we tell low pitches apart far better than high ones. This is the standard input for almost every audio model.

<svg viewBox="0 0 320 100" role="img" aria-label="A waveform transformed into a mel spectrogram, a rectangular heatmap of frequency over time" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M12 40 Q24 20 36 40 T60 40 Q72 58 84 40 T108 40" stroke="#24405e" fill="none"/><text x="60" y="72" text-anchor="middle" fill="#6b6b6b">waveform</text>
  <path d="M120 40 L150 40" stroke="#1a1a1a" marker-end="url(#sp)"/><text x="135" y="33" text-anchor="middle" fill="#6b6b6b">FFT</text>
  <g>
  <rect x="160" y="12" width="150" height="56" fill="#f4f7fb" stroke="#c9d6e5"/>
  <rect x="160" y="50" width="150" height="18" fill="#24405e" fill-opacity="0.8"/><rect x="160" y="36" width="150" height="14" fill="#3d6ea5" fill-opacity="0.6"/><rect x="185" y="20" width="30" height="16" fill="#c0392b" fill-opacity="0.7"/><rect x="250" y="22" width="26" height="14" fill="#c0392b" fill-opacity="0.6"/></g>
  <text x="235" y="82" text-anchor="middle" fill="#6b6b6b">mel spectrogram (freq × time)</text>
  <defs><marker id="sp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
This is the key move of audio deep learning: a spectrogram *is an image*, so every tool from Module 4 — CNNs, transformers, augmentation — applies to sound. Much of audio AI is computer vision on spectrograms.
:::
