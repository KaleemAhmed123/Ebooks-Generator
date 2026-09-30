## Architectures: LeNet to ResNet

- CNN design is a story of going deeper without breaking. Four landmarks tell it.
- **LeNet-5** (1998) — 7 layers, read handwritten digits on cheques. Proved the conv → pool → dense recipe works.
- **AlexNet** (2012) — deeper, trained on two GPUs, won ImageNet by a huge margin. This result started the deep-learning boom.
- **VGG** (2014) — showed that stacking small 3×3 convs beats a few large ones. Simple, uniform, still a common baseline.

<svg viewBox="0 0 350 96" role="img" aria-label="A timeline of CNN architectures growing in depth: LeNet 7 layers, AlexNet 8, VGG 19, ResNet 152" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="20" y1="70" x2="330" y2="70" stroke="#1a1a1a"/>
  <g fill="#24405e"><rect x="30" y="58" width="14" height="12"/><rect x="110" y="52" width="14" height="18"/><rect x="190" y="34" width="14" height="36"/><rect x="270" y="14" width="14" height="56"/></g>
  <g text-anchor="middle" font-size="8"><text x="37" y="84">LeNet '98</text><text x="117" y="84">AlexNet '12</text><text x="197" y="84">VGG '14</text><text x="277" y="84">ResNet '15</text></g>
  <g text-anchor="middle" fill="#6b6b6b" font-size="8"><text x="37" y="52">7</text><text x="117" y="46">8</text><text x="197" y="28">19</text><text x="277" y="8">152</text></g>
</svg>

- **ResNet** (2015) — 152 layers, and it *still trained*. Its trick, the residual connection, is the next page and remains in almost every model since, vision or language.

:::warn
Before ResNet, stacking past ~20 layers made accuracy get *worse*, not better — deeper plain networks became untrainable. The barrier was the vanishing gradient over long paths. Depth alone is not free; it needed a structural fix.
:::
