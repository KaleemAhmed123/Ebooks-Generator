## Reconnection with Backoff

Clients have to reconnect when a connection drops — with exponential backoff and
jitter, or a server restart becomes a self-inflicted denial of service.

Fifty thousand clients drop when a pod restarts. A fixed one-second retry means
fifty thousand simultaneous handshakes every second, against a server that is
still starting up.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A fixed retry interval sends every client at once in repeated spikes, while jittered exponential backoff spreads the same reconnections out over time">
  <text x="4" y="16" font-family="Consolas,monospace" font-size="8.5" fill="#b32d2b">fixed 1s</text>
  <g fill="#b32d2b">
    <rect x="76" y="4" width="6" height="16"/><rect x="146" y="4" width="6" height="16"/>
    <rect x="216" y="4" width="6" height="16"/><rect x="286" y="4" width="6" height="16"/>
    <rect x="356" y="4" width="6" height="16"/>
  </g>
  <text x="376" y="16" font-family="Georgia,serif" font-size="8.5" fill="#b32d2b">all at once</text>
  <text x="4" y="48" font-family="Consolas,monospace" font-size="8.5" fill="#1f6f8b">jittered</text>
  <g fill="#1f6f8b">
    <rect x="76" y="40" width="3" height="12"/><rect x="92" y="40" width="3" height="12"/><rect x="118" y="40" width="3" height="12"/>
    <rect x="152" y="40" width="3" height="12"/><rect x="196" y="40" width="3" height="12"/><rect x="238" y="40" width="3" height="12"/>
    <rect x="290" y="40" width="3" height="12"/><rect x="344" y="40" width="3" height="12"/><rect x="398" y="40" width="3" height="12"/>
  </g>
  <text x="76" y="60" font-family="Georgia,serif" font-size="8.5" fill="#1f6f8b">1s, 2s, 4s, 8s — capped, each with random offset</text>
</svg>

The jitter matters more than the backoff. Exponential without jitter just moves
the whole herd to the same later moment.

## Referential Equality

React compares props and dependencies with `Object.is`. A new object or function
literal on every render is always "different", which defeats memoisation.

Passing `style={{ margin: 4 }}` to a memoised child re-renders it every single
time, because the object literal is a new object on each render even though its
contents never change.

The same applies to inline callbacks, array literals, and anything constructed
in the component body and handed downward.

**This is why adding `memo` to a child often changes nothing.** The memo is
working correctly; the props genuinely are new. Hoist the constant out of the
component, or wrap it so the reference survives between renders.
