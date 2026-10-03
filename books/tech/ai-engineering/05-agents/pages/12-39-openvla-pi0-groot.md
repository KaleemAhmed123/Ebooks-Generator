## OpenVLA, π0, and GR00T

- Three VLAs mark the open and frontier state of the art as of 2026.

| Model | Who | Idea |
|---|---|---|
| **OpenVLA** (2024) | Stanford + partners | ~7B open VLA on a Llama-2 backbone with DINOv2 + SigLIP vision; **binned action tokens**; the open baseline everyone builds on |
| **π0 (pi-zero)** (2024) | Physical Intelligence | VLM brain + a **flow-matching action expert** for smooth, high-frequency continuous control; strong dexterity (folding, packing) |
| **GR00T** (2024–2025) | NVIDIA | Foundation model for **humanoid** robots; trained on human video + simulation + teleoperation; aimed at general-purpose humanoids |

<svg viewBox="0 0 360 78" role="img" aria-label="OpenVLA uses binned actions, pi-zero uses a flow action expert, GR00T targets humanoids" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="16" width="108" height="46" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="62" y="32" text-anchor="middle" font-size="6.5">OpenVLA</text><text x="62" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">open · binned</text>
  <rect x="126" y="16" width="108" height="46" rx="4" fill="#d5e8fb" stroke="#24405e"/><text x="180" y="32" text-anchor="middle" font-size="6.5">π0</text><text x="180" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">flow expert · dexterous</text>
  <rect x="244" y="16" width="108" height="46" rx="4" fill="#24405e"/><text x="298" y="32" text-anchor="middle" fill="#fff" font-size="6.5">GR00T</text><text x="298" y="46" text-anchor="middle" fill="#cdd" font-size="5.5">humanoid foundation</text>
</svg>

- The trajectory mirrors LLMs: an **open baseline** (OpenVLA, like the first open LLMs), a **capability leap** via a better action head (π0), and a **foundation-model** push toward one model for a whole robot class (GR00T). The field is roughly where language models were a few years earlier — and moving fast.
- Data is the bottleneck, not architecture. There is no internet-scale corpus of robot actions the way there is of text, so teams mine human video, simulation, and teleoperation. Whoever solves robot *data* leads.

:::note
Notice the reuse: OpenVLA's backbone is a language model (Llama-2) and its eyes are the same DINOv2/SigLIP encoders from the vision cluster. A robot foundation model is not a new field bolted on — it is this module's VLM plus an action head plus a data-collection problem. The skills transfer directly.
:::
