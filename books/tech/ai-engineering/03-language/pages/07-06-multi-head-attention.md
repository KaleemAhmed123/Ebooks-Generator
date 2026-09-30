## Multi-head attention

- One attention operation learns **one** way for tokens to relate. But words relate in many ways at once — grammatically, semantically, by position. **Multi-head attention** runs several attentions in parallel, each with its own `Wq, Wk, Wv`.
- Each **head** looks at the sequence through a different lens. One head might track subject-verb agreement; another, which adjective modifies which noun; another, nearby word order.

<svg viewBox="0 0 360 92" role="img" aria-label="Input splits into several attention heads that run in parallel and concatenate into one output" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="40" width="46" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="35" y="53" text-anchor="middle">input</text>
  <g fill="#24405e"><rect x="100" y="8" width="70" height="16" rx="3"/><rect x="100" y="30" width="70" height="16" rx="3"/><rect x="100" y="52" width="70" height="16" rx="3"/><rect x="100" y="74" width="70" height="16" rx="3"/></g>
  <g fill="#fff" font-size="7" text-anchor="middle"><text x="135" y="20">head 1</text><text x="135" y="42">head 2</text><text x="135" y="64">head 3</text><text x="135" y="86">head 4</text></g>
  <g stroke="#1a1a1a"><path d="M58 46 L98 16" marker-end="url(#mh)"/><path d="M58 48 L98 38" marker-end="url(#mh)"/><path d="M58 50 L98 60" marker-end="url(#mh)"/><path d="M58 52 L98 82" marker-end="url(#mh)"/></g>
  <rect x="210" y="30" width="50" height="36" rx="3" fill="#6a9bd0"/><text x="235" y="52" text-anchor="middle" fill="#fff">concat</text>
  <g stroke="#1a1a1a"><path d="M170 16 L208 40" marker-end="url(#mh)"/><path d="M170 60 L208 52" marker-end="url(#mh)"/></g>
  <path d="M262 48 L296 48" stroke="#1a1a1a" marker-end="url(#mh)"/>
  <rect x="300" y="38" width="52" height="20" rx="3" fill="#1a3a2a"/><text x="326" y="52" text-anchor="middle" fill="#fff">·Wₒ</text>
  <defs><marker id="mh" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The heads' outputs are concatenated and passed through one more matrix `Wo` to mix them back into a single vector.
- The 2017 base model used **8 heads**. The trick: split the model dimension across heads (512 ÷ 8 = 64 each), so multi-head costs about the same as single-head — more perspectives, same compute.

:::note
Reading a trained model's heads is how researchers *see* what it learned — some heads reliably point each word at its syntactic parent, others at the previous token. This is also the natural join to Booklet 2: a **vision transformer** (page 04-16 there) is this exact multi-head block fed image patches instead of word tokens. The engine is identical; only the input changes.
:::
