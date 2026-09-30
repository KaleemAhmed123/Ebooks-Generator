## 3D vision: NeRF

- Given a handful of photos of a scene from different angles, a **neural radiance field (NeRF)** learns the full 3D scene, so you can render it from *new* viewpoints you never photographed.
- The trick: train a small network to answer one question — "at this 3D point, looking in this direction, what colour and how opaque?" Ask it along rays through every pixel and you render an image.
- To learn, it renders from the known camera angles, compares to the real photos, and adjusts. The 3D scene is stored entirely in the network's weights.

<svg viewBox="0 0 330 100" role="img" aria-label="Several cameras around an object feed a NeRF network, which can then render a brand new viewpoint" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <circle cx="70" cy="50" r="22" fill="#f4c542"/>
  <g fill="#24405e"><rect x="20" y="20" width="12" height="9"/><rect x="30" y="70" width="12" height="9"/><rect x="110" y="24" width="12" height="9"/></g>
  <text x="70" y="92" text-anchor="middle" fill="#6b6b6b">few input photos</text>
  <path d="M136 45 L168 45" stroke="#1a1a1a" marker-end="url(#nf)"/>
  <rect x="172" y="34" width="54" height="26" rx="3" fill="#1a3a2a"/><text x="199" y="51" text-anchor="middle" fill="#fff">NeRF</text>
  <path d="M228 45 L260 45" stroke="#1a1a1a" marker-end="url(#nf)"/>
  <circle cx="292" cy="47" r="20" fill="#f4c542"/><text x="292" y="92" text-anchor="middle" fill="#6b6b6b">new view</text>
  <defs><marker id="nf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
NeRF's original cost is steep: hours to train one scene, and rendering marches a network along every ray, so it was far from real-time. It also learns *one* scene, not a general model. The next page — Gaussian splatting — keeps the quality but renders in real time.
:::
