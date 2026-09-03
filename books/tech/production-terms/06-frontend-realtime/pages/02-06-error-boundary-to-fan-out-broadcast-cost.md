## Error Boundary

A component that catches render-time errors in its subtree and shows a fallback
instead of unmounting the whole application.

One widget throws on undefined data. Without a boundary the entire dashboard
goes blank; with one, that panel shows an error and everything else keeps
working.

**What it does not catch is the part people get wrong:** errors inside event
handlers, anything asynchronous, errors during server rendering, and errors
thrown by the boundary itself.

That list covers most of the ways a real application fails, which is why an
error boundary is a containment strategy rather than an error-handling one.

## Fan-Out Broadcast Cost

Emitting to a large room is N individual socket writes. At scale that is the
bottleneck, not your business logic.

A 50,000-user room receiving ten messages a second is 500,000 socket writes a
second. Nothing in the handler is slow — the handler runs once. The cost is
entirely in the delivery.

| | Writes per second |
|---|---|
| 1 message, 50,000 sockets | 50,000 |
| 10 messages a second | 500,000 |

Three ways through, and they compose: batch several updates into one frame,
throttle how often a room can emit at all, and shard a very large room across
processes so no single one owns every socket.
