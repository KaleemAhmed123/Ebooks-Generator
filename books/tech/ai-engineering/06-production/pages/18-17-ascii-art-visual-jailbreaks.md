## ASCII-art and visual jailbreaks

- Safety training filters *semantic* requests — it recognises "how do I build a bomb" as harmful. Attackers evade the filter by encoding the harmful request in a form the safety layer does not read as language but the model still decodes.
- **ASCII-art jailbreaks** (e.g. ArtPrompt, 2024) spell the forbidden word as ASCII art. The safety classifier, scanning text tokens, does not see the word; the model, good at puzzles, reconstructs it and answers. **[VERIFY]**

<svg viewBox="0 0 360 90" role="img" aria-label="A harmful word hidden as ASCII art passes the text safety filter but is decoded by the model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="60" rx="4" fill="#f4f4f4" stroke="#888"/><text x="89" y="28" text-anchor="middle" font-size="5.5" fill="#6b6b6b">harmful word as ASCII art</text>
  <text x="24" y="42" font-size="6" font-family="monospace">#  #  ###  #  #</text><text x="24" y="52" font-size="6" font-family="monospace">####  ##   ####</text><text x="89" y="68" text-anchor="middle" font-size="5.5" fill="#6b6b6b">text filter sees noise</text>
  <rect x="196" y="22" width="70" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="231" y="35" text-anchor="middle" font-size="6">filter: OK ✓</text>
  <rect x="196" y="50" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="231" y="63" text-anchor="middle" font-size="6">model decodes ✗</text>
  <rect x="286" y="36" width="62" height="20" rx="3" fill="#24405e"/><text x="317" y="49" text-anchor="middle" font-size="6" fill="#fff">complies</text>
  <path d="M164 40 L194 34" stroke="#888" marker-end="url(#av)"/><path d="M164 52 L194 58" stroke="#888" marker-end="url(#av)"/><path d="M266 56 L284 48" stroke="#888" marker-end="url(#av)"/>
  <defs><marker id="av" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Visual jailbreaks** are the multimodal version: put the harmful instruction *inside an image* fed to a VLM (Booklet 5). The text-based safety filter never sees it because it is pixels; the vision encoder reads it and the model acts on it. Same structure, different channel.
- **The general pattern is an encoding gap:** the safety check and the model's understanding operate on *different representations*, and the attack lives in the gap between them — anywhere the model comprehends something the filter did not normalise (base64, leetspeak, low-resource languages, ciphers, images).

:::interview
"Why do ASCII-art and image jailbreaks work, and how do you defend?"

They exploit a representation mismatch: the safety filter scans one form (text tokens) while the model understands another (decoded art, pixels, cipher), so the harmful content is invisible to the filter but legible to the model. The defence is to **check safety on what the model actually understands, not on the raw input** — run the classifier on a normalised/decoded rendering, screen the *output* not just the input, and use a multimodal safety model for image inputs. Input-only text filtering will always lose to a new encoding; output-side and normalised checking is the durable move.
:::
