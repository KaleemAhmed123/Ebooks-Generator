## Reflow vs Repaint

Reflow recalculates geometry and is expensive. Repaint only redraws pixels.
Animating a layout property forces reflow on every frame.

Animating `left` reflows on all sixty frames. Animating
`transform: translateX()` is composited on the GPU and skips layout entirely.

| Property | Costs |
|---|---|
| `left`, `top`, `width`, `height` | layout, paint, composite |
| `color`, `background` | paint, composite |
| `transform`, `opacity` | composite only |

The third row is the only one that reliably holds sixty frames a second. If an
animation is janky, the first thing to check is which row its properties are on.

## Rooms & Namespaces

Rooms are server-side groupings for targeted broadcast. Namespaces split one
connection into logical channels over a single transport.

`socket.join("doc:42")` followed by `io.to("doc:42").emit(...)` reaches that
document's editors and nobody else.

**A room is a broadcast target; a namespace is a separate set of handlers over
the same connection.** Rooms are cheap and dynamic — create one per document,
per conversation, per whatever "these people should see this" means.
