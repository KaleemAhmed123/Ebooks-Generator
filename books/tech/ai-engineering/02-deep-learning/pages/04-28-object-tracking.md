## Object tracking

- **Object tracking** follows the same objects across the frames of a video, giving each a stable **ID**. Detection alone re-finds objects every frame but does not know that frame 2's "car" is frame 1's "car".
- The common recipe is **tracking-by-detection**: run a detector each frame, then link this frame's boxes to last frame's tracks.
- Linking uses two signals: **motion** (where each object should be next, predicted by a simple filter) and **appearance** (an embedding of how the object looks, to re-match it after it is briefly hidden).

<svg viewBox="0 0 330 96" role="img" aria-label="Three video frames with a car box carrying the same ID 1 as it moves left to right across the frames" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#f4f7fb" stroke="#c9d6e5"><rect x="12" y="24" width="90" height="52"/><rect x="118" y="24" width="90" height="52"/><rect x="224" y="24" width="90" height="52"/></g>
  <rect x="24" y="44" width="26" height="18" fill="none" stroke="#24405e" stroke-width="2"/><text x="27" y="42" fill="#24405e">ID 1</text>
  <rect x="150" y="44" width="26" height="18" fill="none" stroke="#24405e" stroke-width="2"/><text x="153" y="42" fill="#24405e">ID 1</text>
  <rect x="272" y="44" width="26" height="18" fill="none" stroke="#24405e" stroke-width="2"/><text x="275" y="42" fill="#24405e">ID 1</text>
  <text x="163" y="90" text-anchor="middle" fill="#6b6b6b">same ID kept as the object moves</text>
</svg>

:::warn
The hard case is **identity switches**: two objects cross or one is briefly hidden, and the tracker swaps their IDs. Appearance embeddings help, but crowded scenes with lookalikes (a stadium crowd, identical products on a line) still break simple trackers. Tracking is scored on ID consistency, not just per-frame boxes.
:::
