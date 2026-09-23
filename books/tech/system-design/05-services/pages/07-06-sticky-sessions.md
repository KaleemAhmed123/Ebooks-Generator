## Sticky sessions

- **Affinity** sends every request from one client back to the instance that served the first. At L7 the balancer sets a cookie naming the instance; at L4 it can only hash the address, with the NAT problem from page 2
- It exists for one reason: session state living in an instance's memory rather than in a store both instances can read

<svg viewBox="0 0 460 112" role="img" aria-label="Sticky sessions. The balancer sets a cookie naming the instance, so user A always returns to instance one where A's cart is held in memory, and user B always returns to instance two. When a deploy restarts instance one, A's cart is gone from memory, so affinity did not protect the session, it only concentrated the loss. State held in a shared store removes the need for affinity and the failure together. An orange cross marks Kubernetes ClientIP affinity, which pins for 10 800 seconds by default: three hours, on pods that rarely live that long." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="12" font-size="7.5">the balancer sets a cookie naming the instance; the client returns to it</text>
  <rect x="4" y="26" width="48" height="16" rx="3" fill="#fff" stroke="#1d4e89"/><text x="28" y="37" text-anchor="middle" font-size="7">user A</text>
  <rect x="4" y="50" width="48" height="16" rx="3" fill="#fff" stroke="#1d4e89"/><text x="28" y="61" text-anchor="middle" font-size="7">user B</text>
  <rect x="88" y="32" width="56" height="28" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="116" y="49" text-anchor="middle" font-size="7.5">balancer</text>
  <line x1="52" y1="34" x2="86" y2="42" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="52" y1="58" x2="86" y2="50" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="200" y="22" width="96" height="24" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="248" y="33" text-anchor="middle" font-size="7.5">instance 1</text><text x="248" y="43" text-anchor="middle" font-size="6.5">A's cart, in memory</text>
  <rect x="200" y="52" width="96" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="248" y="63" text-anchor="middle" font-size="7.5">instance 2</text><text x="248" y="73" text-anchor="middle" font-size="6.5">B's cart, in memory</text>
  <line x1="144" y1="40" x2="198" y2="34" stroke="#1d4e89" marker-end="url(#b)"/><text x="171" y="32" text-anchor="middle" font-size="6">srv=i1</text>
  <line x1="144" y1="52" x2="198" y2="64" stroke="#1d4e89" marker-end="url(#b)"/><text x="171" y="70" text-anchor="middle" font-size="6">srv=i2</text>
  <text x="308" y="28" font-size="6.5" fill="#bf4c28">a deploy restarts</text>
  <text x="308" y="38" font-size="6.5" fill="#bf4c28">instance 1 —</text>
  <text x="308" y="48" font-size="6.5" fill="#bf4c28">A's cart is gone,</text>
  <text x="308" y="58" font-size="6.5" fill="#bf4c28">and affinity cannot</text>
  <text x="308" y="68" font-size="6.5" fill="#bf4c28">route around it</text>
  <text x="4" y="90" font-size="7">state in the instance is what forces affinity; state in a shared store removes the need and the failure together</text>
  <text x="4" y="105" font-size="7.5" fill="#bf4c28">✕ Kubernetes ClientIP affinity pins for 10 800 s by default — three hours, on pods that rarely live that long</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- Affinity also gives up on balance. Traffic is pinned by client, not by cost, so one heavy user is stuck on one instance and the balancer is no longer permitted to fix it
- Kubernetes offers `sessionAffinity: ClientIP` with a default timeout of 10 800 seconds. Three hours of pinning is a long commitment from a pod that may be replaced this afternoon

### The failure

- Every deploy is a mass logout. Instance 1 stops, and every session it held is gone — the balancer can route those users elsewhere but cannot recreate what was in that process's heap
- Affinity never protected the session; it concentrated the loss and made it correlated with the one event that happens every day. Sessions in a shared store make instances interchangeable again, which is the property the whole module depends on
