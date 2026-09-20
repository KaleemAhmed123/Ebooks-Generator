## Bulkhead

- In shipbuilding, a bulkhead is a waterproof wall that partitions a ship's hull. If one section floods, the water is contained, and the ship stays afloat
- In software, a bulkhead isolates resources (threads, connection pools, CPU quotas) per dependency. If Service A depends on Service B and Service C, it allocates a separate connection pool for each

<svg viewBox="0 0 460 140" role="img" aria-label="Bulkhead pattern. Threads are partitioned. 5 threads for fast Service B. 5 threads for slow Service C. Service C threads are exhausted, but B threads are fine." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="180" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">No Bulkhead (Shared Pool)</text>
  
  <rect x="40" y="45" width="140" height="60" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="110" y="60" text-anchor="middle">10 Threads</text>
  <text x="110" y="75" text-anchor="middle" fill="#cc0000" font-weight="bold">ALL blocked on C</text>
  <text x="110" y="90" text-anchor="middle" font-size="7">Requests to B queue up</text>

  <rect x="240" y="20" width="180" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="330" y="35" text-anchor="middle" font-weight="bold">Bulkhead (Isolated Pools)</text>
  
  <rect x="250" y="45" width="65" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="282" y="60" text-anchor="middle">5 Threads</text>
  <text x="282" y="75" text-anchor="middle">for B</text>
  <text x="282" y="90" text-anchor="middle" fill="#1d4e89" font-weight="bold">Healthy</text>
  
  <rect x="345" y="45" width="65" height="60" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="377" y="60" text-anchor="middle">5 Threads</text>
  <text x="377" y="75" text-anchor="middle">for C</text>
  <text x="377" y="90" text-anchor="middle" fill="#cc0000" font-weight="bold">Blocked</text>
  
  <path d="M330 45 L330 105" stroke="#1a1a1a" stroke-width="2"/>
</svg>

- If Service C suddenly slows down and takes 10 seconds to respond, all 5 threads dedicated to Service C will block. But the 5 threads dedicated to Service B are completely unaffected

### The failure

- The failure is using a single, shared HTTP connection pool for all outbound requests. When one downstream service slows down, the caller's threads are consumed waiting for it
- Eventually, every thread in the shared pool is blocked waiting for the slow service. The caller can no longer serve *any* requests, even those that only need the healthy services. One sick dependency takes down the entire calling service
