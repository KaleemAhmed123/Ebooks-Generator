## VLM: beyond images — audio and video

- The VLM you built (Flagship 6) handles images. The *same pattern* — encode a modality into tokens, project into the LLM's space, attend jointly — extends to audio and video, which is how "omni" models (Booklet 5) handle everything in one model.

<svg viewBox="0 0 360 84" role="img" aria-label="The same encode-project-fuse pattern extends from images to audio and video, all becoming tokens the LLM attends over" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="12" y="16" width="60" height="14" rx="2"/><rect x="12" y="34" width="60" height="14" rx="2"/><rect x="12" y="52" width="60" height="14" rx="2"/></g>
  <text x="42" y="26" text-anchor="middle" font-size="5.5">image → patches</text><text x="42" y="44" text-anchor="middle" font-size="5.5">audio → frames</text><text x="42" y="62" text-anchor="middle" font-size="5.5">video → frames×time</text>
  <rect x="100" y="30" width="70" height="24" rx="3" fill="#24405e"/><text x="135" y="40" text-anchor="middle" fill="#fff" font-size="6">projector(s)</text><text x="135" y="49" text-anchor="middle" fill="#cdd" font-size="5">→ LLM token space</text>
  <rect x="198" y="30" width="70" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="233" y="44" text-anchor="middle" font-size="6">LLM (joint attention)</text>
  <rect x="292" y="30" width="60" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="322" y="44" text-anchor="middle" font-size="6">answer</text>
  <path d="M72 40 L98 40 M170 42 L196 42 M268 42 L290 42" stroke="#888" marker-end="url(#av2)"/>
  <defs><marker id="av2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Audio** becomes tokens via an audio encoder (frames of a spectrogram or learned audio features), projected into the LLM space just like image patches — enabling speech understanding, audio Q&A, and (with an audio *decoder*) speech output, the speech-to-speech models of Booklet 2/5.
- **Video is the token-explosion extreme** — frames × time, so a short clip is thousands of visual tokens. The techniques are the resolution ones scaled up (17-28b, 19-46a): sample keyframes, pool tokens temporally, and budget aggressively, because naive per-frame patchification overwhelms the context instantly.

:::note
The unifying insight — and the reason "multimodal" isn't a separate architecture — is that *every* modality reduces to the same recipe: encode it into tokens, project into the shared embedding space, and let the LLM attend over the mixed sequence (the fusion you built in 19-47). Image patches, audio frames, video frames — all become tokens the transformer treats uniformly. "Omni" models are this taken to its conclusion: one model, one token space, any input modality (and, with decoders, any output). The VLM you built is the general pattern; audio and video are the same idea with different encoders and a bigger token budget to manage.
:::
