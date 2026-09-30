## Monocular depth

- **Monocular depth estimation** predicts how far away every pixel is, from a *single* ordinary photo — no stereo pair, no depth sensor.
- It seems impossible: one flat image has no true distance information. It works because the model learned the cues humans use — perspective, occlusion, known object sizes, blur — from millions of images with depth labels.
- The output is a **depth map**: same size as the image, each pixel a distance (or a relative near-far value).

<svg viewBox="0 0 320 96" role="img" aria-label="A photo on the left maps to a depth map on the right where near objects are light and far objects are dark" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="15" y="20" width="110" height="60" fill="#f4f7fb" stroke="#c9d6e5"/><rect x="35" y="45" width="30" height="35" fill="#3d6ea5"/><rect x="85" y="35" width="25" height="45" fill="#6b6b6b"/><text x="70" y="92" text-anchor="middle" fill="#6b6b6b">photo</text>
  <path d="M132 50 L164 50" stroke="#1a1a1a" marker-end="url(#dp)"/>
  <defs><linearGradient id="grd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#111"/></linearGradient><marker id="dp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
  <rect x="172" y="20" width="110" height="60" fill="url(#grd)"/><rect x="192" y="45" width="30" height="35" fill="#f0f0f0"/><rect x="242" y="35" width="25" height="45" fill="#555"/><text x="227" y="92" text-anchor="middle" fill="#6b6b6b">depth: light=near</text>
</svg>

- Modern models (the Depth Anything family and similar) are trained on huge mixed datasets and generalise **zero-shot** to scenes they never saw — a foundation model for depth.

:::note
Depth turns a 2D photo into something 3D-aware. It feeds robot navigation, AR object placement, background blur ("portrait mode"), and it gives image and video generators a geometry hint to keep scenes consistent.
:::
