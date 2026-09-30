## Neural audio codecs

- A **neural audio codec** is a network that compresses sound into a short stream of discrete **tokens** and rebuilds it convincingly — matching old codecs at three to four times fewer bits.
- Why it matters beyond compression: those tokens turn continuous audio into a small vocabulary of symbols, exactly the form a language model can predict. The codec is the bridge from waveforms to "words" for audio LMs.
- The breakthrough is **residual vector quantization (RVQ)**, introduced for audio in **SoundStream** (2021): quantize the signal coarsely, then quantize the leftover error, then its error again — stacked layers, each adding detail.

<svg viewBox="0 0 330 88" role="img" aria-label="A waveform is encoded and quantized in stacked residual layers into tokens, then decoded back to a waveform" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M10 34 Q18 22 26 34 T42 34" stroke="#24405e" fill="none"/>
  <path d="M48 30 L72 30" stroke="#1a1a1a" marker-end="url(#nc)"/><text x="60" y="24" text-anchor="middle" fill="#6b6b6b">enc</text>
  <g fill="#3d6ea5"><rect x="80" y="20" width="14" height="10"/><rect x="80" y="32" width="14" height="10"/><rect x="80" y="44" width="14" height="10"/></g>
  <text x="87" y="70" text-anchor="middle" fill="#6b6b6b">RVQ tokens</text>
  <path d="M100 34 L124 34" stroke="#1a1a1a" marker-end="url(#nc)"/><text x="112" y="24" text-anchor="middle" fill="#6b6b6b">dec</text>
  <path d="M130 34 Q138 22 146 34 T162 34" stroke="#1a3a2a" fill="none"/>
  <text x="235" y="30" text-anchor="middle">EnCodec (2022) built on SoundStream;</text>
  <text x="235" y="44" text-anchor="middle">Mimi powers Moshi (next page).</text>
  <defs><marker id="nc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
RVQ gives a knob: use more codebook layers for higher quality, fewer for lower bitrate. The first layer alone captures a coarse, mostly-*semantic* version of the sound; later layers add acoustic fineness. Audio LMs exploit this, modelling the coarse tokens first.
:::
