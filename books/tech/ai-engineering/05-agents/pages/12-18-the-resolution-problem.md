## The resolution problem

- CLIP was trained at 224 or 336 px. That is enough to see a dog, a beach, a face. It is nowhere near enough to read a paragraph on a screenshot, a value in a spreadsheet, or a label on a diagram.
- Downscaling a 1920×1080 screenshot to 336×336 destroys text before the model sees a pixel of it. The information is simply gone.

<svg viewBox="0 0 360 96" role="img" aria-label="A high resolution document shrunk to 336 pixels loses its text, which small patches at native resolution keep" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="18" width="90" height="60" rx="3" fill="#fff" stroke="#24405e"/><g stroke="#333" stroke-width="0.6"><line x1="18" y1="28" x2="92" y2="28"/><line x1="18" y1="34" x2="92" y2="34"/><line x1="18" y1="40" x2="92" y2="40"/><line x1="18" y1="46" x2="92" y2="46"/><line x1="18" y1="52" x2="80" y2="52"/></g><text x="55" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">1920×1080 doc</text>
  <text x="120" y="52" font-size="7">↓ shrink to 336</text>
  <rect x="200" y="30" width="36" height="36" rx="3" fill="#ccc"/><g stroke="#999" stroke-width="0.8"><line x1="204" y1="40" x2="232" y2="40"/><line x1="204" y1="50" x2="232" y2="50"/></g><text x="218" y="90" text-anchor="middle" font-size="6" fill="#a03050">blurred → text gone</text>
  <text x="300" y="44" font-size="6" fill="#1a3a2a">need: keep native</text><text x="300" y="55" font-size="6" fill="#1a3a2a">resolution → more</text><text x="300" y="66" font-size="6" fill="#1a3a2a">patches</text>
</svg>

- **The bind:** to read fine detail you need more patches; more patches means a longer sequence; attention cost grows with the *square* of that length. Naively raising resolution is quadratically expensive and quickly hits the context limit.
- Three families of fixes, next pages: **AnyRes tiling** (cut the big image into encoder-sized tiles), **patch-n-pack / NaViT** (encode any resolution natively and pack), and **token pooling** (merge patches after encoding). Every modern high-res VLM uses one or more.

:::note
Resolution is the single biggest quality lever for document, chart, UI, and OCR-heavy tasks — the tasks agents care about most. If your VLM misreads receipts or can't click the right button, suspect resolution before reasoning. The whole "computer-use" wave depends on solving exactly this problem.
:::
