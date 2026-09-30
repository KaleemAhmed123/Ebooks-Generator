## Image generation: GANs

- A **generative adversarial network (GAN)** learns to create new images by pitting two networks against each other.
- The **generator** turns random noise into a fake image. The **discriminator** judges images as real or fake. They train together: the generator tries to fool the judge; the judge tries not to be fooled.
- At equilibrium the generator produces images the discriminator can no longer tell from real. GANs (2014) drove the first wave of convincing fake faces.

<svg viewBox="0 0 340 100" role="img" aria-label="Random noise feeds a generator that makes a fake image; a discriminator compares fake and real images and outputs real or fake, with feedback to the generator" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="20" y="52" fill="#6b6b6b">noise</text>
  <rect x="52" y="38" width="60" height="26" rx="3" fill="#24405e"/><text x="82" y="55" text-anchor="middle" fill="#fff">generator</text>
  <path d="M114 51 L140 51" stroke="#1a1a1a" marker-end="url(#gn)"/><text x="150" y="54" fill="#6b6b6b">fake</text>
  <rect x="180" y="38" width="70" height="26" rx="3" fill="#1a3a2a"/><text x="215" y="55" text-anchor="middle" fill="#fff">discriminator</text>
  <text x="188" y="20" fill="#6b6b6b">real images</text><path d="M215 24 L215 36" stroke="#1a1a1a" marker-end="url(#gn)"/>
  <path d="M252 51 L285 51" stroke="#1a1a1a" marker-end="url(#gn)"/><text x="292" y="47" font-size="8">real?</text>
  <path d="M215 66 C215 92 82 92 82 66" stroke="#c0392b" fill="none" marker-end="url(#gr)"/><text x="150" y="90" text-anchor="middle" fill="#c0392b">feedback</text>
  <defs><marker id="gn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="gr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::warn
GANs are notoriously unstable to train. If the generator finds one image that always fools the judge, it produces only that — **mode collapse**, where all outputs look the same. This fragility is a big reason the field moved to diffusion (next page), which trains stably and covers far more variety.
:::
