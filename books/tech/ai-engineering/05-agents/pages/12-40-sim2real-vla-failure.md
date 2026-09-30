## Sim2real and where VLAs break

- Robot data is scarce and expensive, so much VLA training happens in **simulation** — cheap, fast, safe, infinitely repeatable. The catch is the **sim2real gap**: a policy that is perfect in simulation often fails on the real robot because reality differs in ways the simulator never modeled.

<svg viewBox="0 0 360 82" role="img" aria-label="A policy trained in simulation must cross the sim2real gap to work on a real robot" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="24" width="90" height="34" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="59" y="40" text-anchor="middle" font-size="6.5">simulation</text><text x="59" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">clean · cheap</text>
  <path d="M108 41 L250 41" stroke="#a03050" stroke-dasharray="4,3" marker-end="url(#s2)"/><text x="180" y="34" text-anchor="middle" font-size="6" fill="#a03050">sim2real gap</text>
  <rect x="256" y="24" width="90" height="34" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="301" y="40" text-anchor="middle" font-size="6.5">real robot</text><text x="301" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">friction · lighting · wear</text>
  <defs><marker id="s2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **What differs:** friction, motor lag, sensor noise, lighting, object weights, camera calibration — the messy physics a simulator approximates. The classic bridge is **domain randomization**: randomize textures, lighting, physics constants in sim so the real world looks like just another random variation.
- **Where VLAs fail even after that:**
  - **Distribution shift.** A new kitchen, a novel object, an unseen lighting — the policy degrades sharply outside its training distribution.
  - **Compounding error.** A small mis-grasp shifts the scene into a state never trained on; the next action is worse; the robot flails (the long-horizon problem of Module 15, embodied).
  - **No undo.** A spilled liquid or dropped glass cannot be reverted. Recovery behaviors must be trained explicitly, and safety limits enforced outside the model.

:::warn
Do not trust a VLA's simulation success rate. A 95% task-completion in sim can be 40% on hardware. The honest metric is **real-robot success under real conditions**, and the honest deployment wraps the model in hard safety limits (force/velocity caps, e-stops) that the learned policy cannot override — the physical-world version of the kill-switches and guardrails in Module 15.
:::
