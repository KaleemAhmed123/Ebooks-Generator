## Speaker recognition

- ASR asks *what* was said. **Speaker recognition** asks *who* said it. Two flavours: **verification** (is this the same person as the enrolled voice? yes/no) and **identification** (which of these known people is speaking?).
- The engine is a **speaker embedding**: a fixed-length vector capturing a voice's identity, trained so the same person's clips land close and different people's land far apart — the metric-learning idea from Module 4, applied to voices.
- To verify, compare the new clip's embedding to the enrolled one by cosine similarity; above a threshold, it is a match.

<svg viewBox="0 0 320 90" role="img" aria-label="Two voice clips become embeddings; a close distance means same speaker, a far distance means different speaker" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M12 30 Q20 18 28 30 T44 30" stroke="#24405e" fill="none"/><text x="28" y="48" text-anchor="middle" fill="#6b6b6b">clip A</text>
  <path d="M12 62 Q20 50 28 62 T44 62" stroke="#1a3a2a" fill="none"/><text x="28" y="80" text-anchor="middle" fill="#6b6b6b">clip B</text>
  <path d="M52 30 L88 34" stroke="#1a1a1a" marker-end="url(#sk)"/><path d="M52 62 L88 58" stroke="#1a1a1a" marker-end="url(#sk)"/>
  <rect x="92" y="30" width="56" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="120" y="49" text-anchor="middle">embed</text>
  <path d="M150 45 L182 45" stroke="#1a1a1a" marker-end="url(#sk)"/>
  <text x="250" y="40" text-anchor="middle">cosine similarity</text><text x="250" y="56" text-anchor="middle" fill="#6b6b6b">&gt; threshold → same</text>
  <defs><marker id="sk" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- A related task is **diarization** — "who spoke when" in a multi-person recording — which clusters speaker embeddings across the timeline to label each segment.

:::warn
Voice is a weak security factor on its own. Recordings replay, and modern voice cloning (next pages) can forge a target speaker from seconds of audio. Speaker verification for access control needs **liveness** and anti-spoofing checks (later page), never the voice match alone.
:::
