## Real-time audio

- Batch audio (transcribe a finished file) is easy: you have the whole signal. **Real-time** (or streaming) audio is hard: you must process sound as it arrives, in small chunks, and commit to outputs before hearing what comes next.
- The system runs on a **frame** cycle: grab the next 10–30 ms of audio, run the models, emit any output, repeat — forever, without falling behind the incoming rate.
- The governing number is **latency**: time from a sound happening to the system responding. For conversation, under ~300 ms feels natural; above it, sluggish.

<svg viewBox="0 0 320 78" role="img" aria-label="Incoming audio split into small frames processed one after another in a continuous pipeline" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="12" y="26" width="24" height="22"/><rect x="38" y="26" width="24" height="22"/><rect x="64" y="26" width="24" height="22"/><rect x="90" y="26" width="24" height="22"/></g>
  <text x="63" y="62" text-anchor="middle" fill="#6b6b6b">20 ms frames, streaming in</text>
  <path d="M120 37 L152 37" stroke="#1a1a1a" marker-end="url(#rt)"/>
  <rect x="156" y="24" width="70" height="26" rx="3" fill="#24405e"/><text x="191" y="41" text-anchor="middle" fill="#fff">process</text>
  <path d="M228 37 L258 37" stroke="#1a1a1a" marker-end="url(#rt)"/><text x="290" y="41" text-anchor="middle">output</text>
  <defs><marker id="rt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
Streaming models must be **causal** — they may look only at past and present audio, never the future. A model trained to see the whole clip (like vanilla Whisper) cannot simply run live; it needs a streaming variant. And every frame must finish processing faster than real time, or the backlog grows without bound and latency spirals.
:::
