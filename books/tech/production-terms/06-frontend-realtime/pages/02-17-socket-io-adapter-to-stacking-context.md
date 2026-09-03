## Socket.io Adapter

The component that relays events between server instances. Without one,
`io.emit` reaches only the clients connected to that one process.

Two pods with users split between them. A message emitted on pod 1 never reaches
pod 2's users, and it works perfectly in development where there is one process.

<svg viewBox="0 0 460 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Without an adapter an emit on one pod reaches only its own clients; with a Redis adapter the event is relayed to the other pod and its clients too">
  <rect x="4" y="6" width="86" height="20" fill="none" stroke="#b32d2b" stroke-width="1.2"/>
  <text x="47" y="20" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">pod 1 emit</text>
  <path d="M92 16 H116" stroke="#b32d2b" stroke-width="1.2"/><path d="M116 16 l-6 -3.5 v7 z" fill="#b32d2b"/>
  <text x="122" y="19" font-family="Georgia,serif" font-size="9" fill="#b32d2b">pod 1 clients only — pod 2 never hears it</text>
  <rect x="4" y="42" width="86" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="47" y="56" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">pod 1 emit</text>
  <path d="M92 52 H116" stroke="#1a1a1a" stroke-width="1.2"/><path d="M116 52 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="120" y="42" width="92" height="20" fill="#e2fcf3" stroke="#1f6f8b" stroke-width="1.3"/>
  <text x="166" y="56" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1f6f8b">Redis pub/sub</text>
  <path d="M214 52 H238" stroke="#1a1a1a" stroke-width="1.2"/><path d="M238 52 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="242" y="42" width="86" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="285" y="56" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">pod 2</text>
  <text x="334" y="56" font-family="Georgia,serif" font-size="9" fill="#1f6f8b">its clients too</text>
</svg>

The most common realtime bug that only appears past one instance.

## Stacking Context

A self-contained z-index layer. A child can never escape its parent's stacking
context, however large its `z-index` is.

Your modal has `z-index: 9999` and still renders behind the header, because an
ancestor has a `transform` and quietly created a context that the modal is
trapped inside.

The properties that create one are easy to add by accident: `transform`,
`opacity` below 1, `filter`, `will-change`, and `position` with a `z-index`.

**A z-index that "does not work" is almost always this.** Raising the number
never helps, because the comparison is happening inside a box the element cannot
leave.
