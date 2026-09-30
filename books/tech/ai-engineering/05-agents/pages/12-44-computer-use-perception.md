## Computer-use perception

- A **computer-use agent** operates a real GUI — it takes a **screenshot**, decides where to click or what to type, acts, and takes another screenshot (Module 15 covers the loop; here is the *perception*). The hard part is not deciding — it is **grounding**: turning "click the Submit button" into exact pixel coordinates `(x, y)`.

<svg viewBox="0 0 360 96" role="img" aria-label="A screenshot is grounded into coordinates the agent clicks, producing a new screenshot" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="18" width="86" height="58" rx="2" fill="#fff" stroke="#24405e"/><rect x="20" y="26" width="70" height="8" fill="#e8f4fd"/><rect x="20" y="40" width="40" height="8" fill="#eee"/><rect x="54" y="58" width="34" height="12" rx="2" fill="#24405e"/><text x="71" y="67" text-anchor="middle" font-size="5" fill="#fff">Submit</text><text x="55" y="86" text-anchor="middle" font-size="5.5" fill="#6b6b6b">screenshot</text>
  <rect x="126" y="30" width="70" height="34" rx="4" fill="#a03050"/><text x="161" y="44" text-anchor="middle" fill="#fff" font-size="6">VLM</text><text x="161" y="55" text-anchor="middle" fill="#fc8" font-size="5">grounding</text>
  <rect x="228" y="34" width="116" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="286" y="50" text-anchor="middle" font-size="6">click(x=71, y=64)</text>
  <path d="M98 47 L124 47" stroke="#888" marker-end="url(#cu)"/><path d="M196 47 L226 47" stroke="#888" marker-end="url(#cu)"/>
  <defs><marker id="cu" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Two grounding approaches:**
  - **Coordinate prediction.** The VLM outputs pixel `(x, y)` directly. Needs a model trained to point (Molmo, dedicated computer-use models) and high resolution so small icons are locatable — screens are dense and unforgiving.
  - **Set-of-marks.** Overlay numbered boxes on every UI element first (from the accessibility tree or a detector), then the VLM just picks a *number* — "click element 7." Far easier than raw pixels, but needs a reliable way to enumerate elements.
- Either way, **resolution is everything again.** A downscaled screenshot blurs the toolbar; the agent clicks the wrong icon. Computer-use is the resolution problem (12-18) at its most punishing.

:::warn
The silent killer of computer-use agents is **off-by-a-few-pixels** grounding: the model names the right button but clicks 20 px off and hits the wrong control, corrupting the whole downstream trajectory. Set-of-marks sidesteps raw-coordinate error by making the model choose a labeled element instead of a point — often the difference between a demo and a product.
:::
