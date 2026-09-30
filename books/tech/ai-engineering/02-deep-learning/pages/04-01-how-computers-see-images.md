# Module 4 - Computer Vision

## How computers see images

- A computer never sees a "photo". It sees a grid of numbers, each giving the brightness of one **pixel** (picture element, the smallest dot in an image).
- A greyscale image is one grid: `0` is black, `255` is white. A colour image is three stacked grids — red, green, blue.
- So an image is just a tensor (Booklet 1): height × width × colour channels. Every vision model starts here.

<svg viewBox="0 0 340 130" role="img" aria-label="A small photo shown as a grid of pixels, each cell labelled with a brightness number from 0 to 255" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="60" y="12" text-anchor="middle" fill="#6b6b6b">what you see</text>
  <circle cx="60" cy="65" r="40" fill="#f4c542"/><circle cx="48" cy="55" r="4" fill="#1a1a1a"/><circle cx="72" cy="55" r="4" fill="#1a1a1a"/><path d="M46 78 Q60 90 74 78" stroke="#1a1a1a" fill="none"/>
  <text x="250" y="12" text-anchor="middle" fill="#6b6b6b">what the computer sees</text>
  <g stroke="#c9d6e5">
  <rect x="180" y="25" width="140" height="80" fill="none"/>
  <path d="M215 25 L215 105M250 25 L250 105M285 25 L285 105M180 45 L320 45M180 65 L320 65M180 85 L320 85"/></g>
  <g fill="#6b6b6b"><text x="190" y="38">240</text><text x="225" y="38">18</text><text x="258" y="38">18</text><text x="293" y="38">240</text><text x="190" y="58">12</text><text x="225" y="58">200</text><text x="260" y="58">6</text><text x="293" y="58">12</text></g>
</svg>

:::note
Because an image is only numbers, the same maths that handled vectors and matrices handles vision. The rest of this module is one question: how do we build a network that respects the *grid* structure instead of throwing it away?
:::
