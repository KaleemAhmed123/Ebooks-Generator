## Gaussian splatting

- **3D Gaussian splatting** (SIGGRAPH 2023) reached NeRF-quality 3D scenes that render in **real time** — a leap NeRF could not make.
- It represents a scene not as a network but as millions of tiny 3D blobs (**Gaussians**), each with a position, size, colour, and transparency. Rendering "splats" these blobs onto the screen with a fast rasterizer — the same kind of operation a GPU does for games.
- Because it is explicit points, not a network to query along every ray, it draws in milliseconds instead of seconds.

<svg viewBox="0 0 320 100" role="img" aria-label="A cloud of overlapping soft ellipses of different colours forming the shape of an object, illustrating a scene built from 3D Gaussians" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g opacity="0.75"><ellipse cx="120" cy="50" rx="26" ry="16" fill="#f4c542"/><ellipse cx="150" cy="42" rx="20" ry="24" fill="#e6a93a"/><ellipse cx="140" cy="62" rx="22" ry="14" fill="#f4d06a" transform="rotate(20 140 62)"/><ellipse cx="105" cy="60" rx="16" ry="20" fill="#f0bb4c"/><ellipse cx="165" cy="58" rx="14" ry="18" fill="#e8b24a"/></g>
  <text x="135" y="92" text-anchor="middle" fill="#6b6b6b">thousands of 3D Gaussians = one object</text>
  <rect x="230" y="30" width="80" height="40" rx="3" fill="#1a3a2a"/><text x="270" y="47" text-anchor="middle" fill="#fff" font-size="9">real-time</text><text x="270" y="60" text-anchor="middle" fill="#cfe0d5">rasterize</text>
</svg>

- The trade against NeRF: splatting wins on speed and edits easily (the blobs are movable objects); NeRF's continuous field still edges it on some volumetric effects like smoke and fine transparency.

:::note
This is why 3D capture went mainstream fast: phone-shot photos in, an explorable, real-time 3D scene out. Splatting now underpins virtual production, product capture, and robot simulation.
:::
