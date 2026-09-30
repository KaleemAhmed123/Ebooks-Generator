## CLIP and open vocabulary

- A normal classifier knows a fixed list of classes. **CLIP** (OpenAI, 2021) broke that limit: it recognises anything you can *describe in words*, with no extra training. This is **zero-shot** classification.
- It trains two encoders — one for images, one for text — to land matching image–text pairs at the same spot in a shared vector space, and non-matching pairs far apart. This is **contrastive learning**, on 400 million pairs scraped from the web.
- To classify, you embed the image and embed each candidate label as text ("a photo of a cat"). The label whose vector is closest wins.

<svg viewBox="0 0 330 110" role="img" aria-label="An image encoder and a text encoder both map into one shared space; matching image and caption land close together" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="15" y="20" width="70" height="26" rx="3" fill="#24405e"/><text x="50" y="37" text-anchor="middle" fill="#fff">image enc</text>
  <rect x="15" y="64" width="70" height="26" rx="3" fill="#1a3a2a"/><text x="50" y="81" text-anchor="middle" fill="#fff">text enc</text>
  <circle cx="230" cy="55" r="45" fill="#f4f7fb" stroke="#c9d6e5"/><text x="230" y="18" text-anchor="middle" fill="#6b6b6b">shared space</text>
  <circle cx="235" cy="48" r="4" fill="#24405e"/><circle cx="243" cy="54" r="4" fill="#1a3a2a"/>
  <text x="255" y="52" font-size="8">close = match</text>
  <g stroke="#1a1a1a"><path d="M87 33 L188 50" marker-end="url(#cl)"/><path d="M87 77 L188 60" marker-end="url(#cl)"/></g>
  <defs><marker id="cl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
CLIP is the bridge between vision and language. It powers text-to-image search, guides diffusion generators toward a prompt, and gives vision-language models their eyes. "Open vocabulary" — recognising classes never seen in training — starts here.
:::
