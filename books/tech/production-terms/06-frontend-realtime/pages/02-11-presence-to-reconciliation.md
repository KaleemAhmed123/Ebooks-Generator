## Presence

Tracking who is online. Deceptively hard, because a crash does not send a
disconnect — so presence has to expire rather than be deleted.

A browser tab is force-quit. No disconnect event fires. Without an expiring key,
that user shows as online indefinitely.

The working shape is a heartbeat writing a key with a TTL — every ten seconds,
expiring in thirty. A live client keeps refreshing it; a dead one stops, and the
key removes itself.

**Never rely on the disconnect handler alone.** It fires on a clean close, which
is the case that was never going to cause you trouble.

## Reconciliation

React diffing the new element tree against the previous one to work out the
smallest set of DOM mutations.

Re-rendering a 200-row table produces 200 new element objects, and React touches
the DOM for the three cells whose text actually changed.

**Render is cheap. DOM writes are not.** That asymmetry is why "it re-renders too
often" is usually the wrong diagnosis — a render that produces an identical tree
costs some JavaScript and no layout, and the profiler will show you which.

The renders worth eliminating are the ones that change the DOM, or the ones
running expensive work inside the component body.
