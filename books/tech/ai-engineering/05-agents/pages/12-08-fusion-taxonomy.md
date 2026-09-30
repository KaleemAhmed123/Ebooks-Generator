## The fusion taxonomy

- Four families, one axis: **how deep into the LLM do the visual tokens reach?** This is the map for the whole architectures half of the module.

<svg viewBox="0 0 360 128" role="img" aria-label="Four fusion families from shallow input-level projection to fully shared token vocabulary" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="20" y1="118" x2="340" y2="118" stroke="#888"/><text x="20" y="128" font-size="6" fill="#6b6b6b">shallow fusion</text><text x="300" y="128" font-size="6" fill="#6b6b6b">deep fusion</text>
  <rect x="18" y="14" width="74" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="26" text-anchor="middle" font-size="6">projector</text><text x="55" y="37" text-anchor="middle" font-size="5.5" fill="#6b6b6b">LLaVA</text>
  <rect x="100" y="14" width="74" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="137" y="26" text-anchor="middle" font-size="6">query bottleneck</text><text x="137" y="37" text-anchor="middle" font-size="5.5" fill="#6b6b6b">BLIP-2</text>
  <rect x="182" y="14" width="74" height="30" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="219" y="26" text-anchor="middle" font-size="6">cross-attention</text><text x="219" y="37" text-anchor="middle" font-size="5.5" fill="#6b6b6b">Flamingo</text>
  <rect x="264" y="14" width="78" height="30" rx="3" fill="#24405e"/><text x="303" y="26" text-anchor="middle" fill="#fff" font-size="6">shared tokens</text><text x="303" y="37" text-anchor="middle" fill="#cdd" font-size="5.5">Chameleon</text>
  <text x="55" y="58" text-anchor="middle" font-size="5.5">prepend to input</text>
  <text x="137" y="58" text-anchor="middle" font-size="5.5">compress, prepend</text>
  <text x="219" y="58" text-anchor="middle" font-size="5.5">inject inside layers</text>
  <text x="303" y="58" text-anchor="middle" font-size="5.5">one vocabulary</text>
</svg>

| Family | How | Trains | Detail | Example |
|---|---|---|---|---|
| **Projector** | Map patches → LLM tokens, prepend to input | Tiny bridge | High | LLaVA |
| **Query bottleneck** | Learned queries pull a fixed few tokens | Small module | Low | BLIP-2 |
| **Cross-attention** | New attention layers read image inside the LLM | Frozen + gates | Med–high | Flamingo |
| **Shared tokens** | Tokenize pixels like text, one stream | From scratch | Tunable | Chameleon |

- **Late fusion** (encode each modality fully, combine only the final vectors) is the shallow extreme — fine for retrieval (CLIP), too weak for reasoning. **Early fusion** (shared tokens) is the deep extreme. The three middle families are the working VLM designs of 2023–2026.

:::interview
**"Name the ways to fuse vision and language and when you'd pick each."** Projector — simplest, best default, keeps detail, needs an unfrozen LLM to learn to see. Query bottleneck — when token budget is tight and gist is enough. Cross-attention — when you must keep the LLM frozen (protect its language skill) yet still fuse deeply. Shared-token early fusion — when you train from scratch and want generation *and* understanding in one model.
:::
