## Video understanding

- Video is images plus **time**. A model that only reads single frames can say "a person, a ball" but not "the person is *throwing* the ball" — the action lives in how frames change.
- The core problem is the **temporal** dimension: the model must relate a pixel now to the same region a few frames ago.
- Three approaches: **3D convolutions** (a kernel that spans height, width, *and* time), **two-stream** networks (one path for appearance, one for motion), and **video transformers** (attention across both space and time — the current default).

<svg viewBox="0 0 320 96" role="img" aria-label="A stack of video frames over time feeds a model that outputs the action label throwing" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#cfe0f0" stroke="#24405e"><rect x="20" y="30" width="46" height="40"/><rect x="34" y="24" width="46" height="40"/><rect x="48" y="18" width="46" height="40"/></g>
  <text x="55" y="86" text-anchor="middle" fill="#6b6b6b">frames over time</text>
  <path d="M100 42 L140 42" stroke="#1a1a1a" marker-end="url(#vd)"/>
  <rect x="146" y="28" width="74" height="30" rx="3" fill="#1a3a2a"/><text x="183" y="47" text-anchor="middle" fill="#fff">video model</text>
  <path d="M222 43 L254 43" stroke="#1a1a1a" marker-end="url(#vd)"/>
  <text x="288" y="47" text-anchor="middle" font-weight="bold">throwing</text>
  <defs><marker id="vd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
Video is expensive. One second at 30 frames is 30 images; attention across all of them costs grow fast. Real systems **sample** frames (a few per second) and work at low resolution, trading temporal detail for feasibility. Full-resolution, every-frame video understanding is still compute-bound.
:::
