## Docker: shipping the whole environment

- Even a perfect virtual environment only pins Python packages. It does not pin the operating system, the system libraries, or the CUDA runtime — so "works on my machine" still happens.
- **Docker** packages your code *and* everything under it — OS libraries, Python, dependencies — into a **container**: a sealed, portable box that runs the same on your laptop, a teammate's machine, and a cloud GPU.

<svg viewBox="0 0 380 84" role="img" aria-label="A container bundling app code, dependencies, and system libraries, running identically on laptop, server, and cloud" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="20" y="8" width="110" height="66" fill="#e8f4fd" stroke="#24405e"/><text x="75" y="22" text-anchor="middle" font-weight="bold">container</text>
  <rect x="30" y="28" width="90" height="12" fill="#fff" stroke="#bbb"/><text x="75" y="37" text-anchor="middle" font-size="7">your code</text>
  <rect x="30" y="42" width="90" height="12" fill="#fff" stroke="#bbb"/><text x="75" y="51" text-anchor="middle" font-size="7">dependencies</text>
  <rect x="30" y="56" width="90" height="12" fill="#fff" stroke="#bbb"/><text x="75" y="65" text-anchor="middle" font-size="7">OS libraries</text>
  <path d="M130 41 L170 41" stroke="#1a1a1a" marker-end="url(#dk)"/>
  <rect x="175" y="16" width="60" height="20" fill="#eafaf0" stroke="#1a3a2a"/><text x="205" y="29" text-anchor="middle">laptop</text>
  <rect x="175" y="40" width="60" height="20" fill="#eafaf0" stroke="#1a3a2a"/><text x="205" y="53" text-anchor="middle">server</text>
  <rect x="255" y="28" width="60" height="20" fill="#1a3a2a"/><text x="285" y="41" text-anchor="middle" fill="#fff">cloud GPU</text>
  <defs><marker id="dk" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

### Image vs container

- An **image** is the frozen blueprint — a snapshot of the whole filesystem. A **container** is a running instance of an image.
- Build an image once, run it as many identical containers as you like, anywhere.

:::note
A container is not a virtual machine. It shares the host's kernel instead of emulating a full computer, so it starts in milliseconds and adds almost no overhead. That lightness is why containers, not VMs, became the unit of deployment.
:::
