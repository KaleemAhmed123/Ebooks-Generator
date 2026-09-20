## 1. Where is the state?

- "Stateless service" is a lie. State always lives somewhere. You are just moving it

<svg viewBox="0 0 460 70" role="img" aria-label="An axis of state durability. Process memory (lost on crash), Local disk (survives crash, lost on VM termination), Remote cache (survives VM termination, lost on cache eviction), Replicated database (survives datacenter fire)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M40 35 L420 35" stroke="#1a1a1a" stroke-width="2"/>
  <path d="M420 35 l-10 -5 v10 z" fill="#1a1a1a"/>
  
  <circle cx="80" cy="35" r="4" fill="#b8541a"/><text x="80" y="55" text-anchor="middle">Process RAM</text>
  <text x="80" y="25" text-anchor="middle" font-size="7" fill="#6b6b6b">Lost on crash</text>
  
  <circle cx="180" cy="35" r="4" fill="#1d4e89"/><text x="180" y="55" text-anchor="middle">Local Disk</text>
  <text x="180" y="25" text-anchor="middle" font-size="7" fill="#6b6b6b">Lost on VM termination</text>
  
  <circle cx="280" cy="35" r="4" fill="#1d4e89"/><text x="280" y="55" text-anchor="middle">Remote Cache</text>
  <text x="280" y="25" text-anchor="middle" font-size="7" fill="#6b6b6b">Lost on eviction/OOM</text>
  
  <circle cx="380" cy="35" r="4" fill="#1a1a1a"/><text x="380" y="55" text-anchor="middle">Replica DB</text>
  <text x="380" y="25" text-anchor="middle" font-size="7" fill="#6b6b6b">Survives DC fire</text>
</svg>

- Pushing state to a database makes the application tier stateless (easy to scale), but makes the database tier a bottleneck (hard to scale)
- Pulling state into process RAM makes the application tier fast, but breaks load balancing (subsequent requests must route to the same node) and destroys the state when the node inevitably crashes (Module 7)

### The failure

- A "stateless" image processing service that writes intermediate chunks to its local `/tmp` directory. When the auto-scaler terminates the node, the chunks are gone. The service was stateful, but the engineer pretended it was not
- Every piece of data needs a home. You must consciously choose where it lives based on the durability it requires
