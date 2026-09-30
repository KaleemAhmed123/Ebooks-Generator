## World models and video diffusion

- A **world model** learns to predict what happens next in an environment, so an agent can imagine and plan instead of acting blindly.
- Two threads converged by 2026. **Video diffusion** generators (the diffusion recipe extended over time) learned scene physics well enough to produce long, coherent clips. **Interactive world models** let you *act* inside a generated scene — press a key, and the model renders the next frame in response.
- Google DeepMind's **Genie** line is the landmark: Genie 2 (2024) generated playable 3D environments from a single image; **Genie 3** (2025) pushed toward real-time, controllable, longer-horizon worlds.

<svg viewBox="0 0 320 96" role="img" aria-label="A current frame plus a user action feed a world model that generates the next frame, in a repeating loop" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="30" width="44" height="34" fill="#24405e"/><text x="36" y="78" text-anchor="middle" fill="#6b6b6b">frame</text>
  <rect x="14" y="8" width="44" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="36" y="20" text-anchor="middle">action ↑</text>
  <path d="M60 40 L96 40" stroke="#1a1a1a" marker-end="url(#wm)"/>
  <rect x="100" y="26" width="74" height="30" rx="3" fill="#1a3a2a"/><text x="137" y="45" text-anchor="middle" fill="#fff">world model</text>
  <path d="M176 40 L212 40" stroke="#1a1a1a" marker-end="url(#wm)"/>
  <rect x="216" y="30" width="44" height="34" fill="#3d6ea5"/><text x="238" y="78" text-anchor="middle" fill="#6b6b6b">next frame</text>
  <path d="M238 28 C238 6 36 6 36 6" stroke="#6b6b6b" fill="none" stroke-dasharray="3 2" marker-end="url(#wm)"/>
  <defs><marker id="wm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
World models drift. Generate far enough and physics bends — objects vanish, geometry warps, the scene forgets what was behind you. Holding long-horizon **consistency and memory** is the open problem, and much of the 2025–2026 research (streaming models, patch memory) targets exactly it. Impressive demos, not yet reliable simulators.
:::
