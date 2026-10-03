## Pixtral, Molmo, and open recipes

- Two more open VLMs worth knowing by name, each contributing a distinct idea.

### Pixtral (Mistral, 2024)
- A ~12B VLM with a from-scratch **400M vision encoder** built for **native resolution** — images enter at their own size and aspect ratio, producing a variable token count (NaViT lineage), with a special token marking row breaks so the LLM reconstructs 2-D layout.
- Lesson: you do not need CLIP. A purpose-built encoder trained with the LLM can beat a bolted-on frozen one.

### Molmo (Allen Institute for AI, 2024)
- Fully **open data**: its value is the **PixMo** dataset, human-collected image descriptions and, notably, **pointing** data — the model can output pixel coordinates ("point to the exit sign").
- Lesson: capability follows data. Pointing exists because someone collected pointing labels; it is not emergent.

<svg viewBox="0 0 360 74" role="img" aria-label="Pixtral contributes native resolution, Molmo contributes open pointing data" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="42" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="89" y="32" text-anchor="middle" font-size="7">Pixtral</text><text x="89" y="46" text-anchor="middle" font-size="6" fill="#6b6b6b">native-res, own encoder</text>
  <rect x="196" y="16" width="150" height="42" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="271" y="32" text-anchor="middle" font-size="7">Molmo</text><text x="271" y="46" text-anchor="middle" font-size="6" fill="#6b6b6b">open data · pointing</text>
</svg>

- **Pointing matters for agents:** a model that emits coordinates can drive a mouse or a robot arm directly. It is the bridge from "describe the screen" to "click the button" — the foundation of computer-use and VLA grounding (later pages).

:::note
The open-VLM landscape splits by what each team optimizes: Qwen for deployment breadth, InternVL for a scaled eye, Pixtral for native resolution without CLIP, Molmo for open data and pointing. None is "best" — they are different points on the detail/cost/openness/grounding grid.
:::
