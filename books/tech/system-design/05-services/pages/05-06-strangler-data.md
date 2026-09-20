## Strangling the data

- Routing HTTP requests is the easy part of the Strangler Fig. The hard part is the data. When the new Billing service launches, it cannot share the legacy monolith's database, or it isn't a microservice
- You must migrate the data safely. The naive approach is "dual writing" from the application, but this is dangerous. If one write succeeds and the other fails, the databases silently diverge
- The robust approach uses Change Data Capture (CDC):
  1. Set up CDC from the legacy DB to the new DB. The new DB is now a live read-replica
  2. Route read traffic to the new service. Verify it works
  3. Reverse the CDC (new DB → legacy DB) to keep the legacy system warm for rollback
  4. Route write traffic to the new service

<svg viewBox="0 0 460 140" role="img" aria-label="Data migration via CDC. Phase 1: Legacy DB uses CDC to replicate to New DB. Phase 2: Write shifts to New DB, which replicates back to Legacy via CDC." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="200" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="120" y="35" text-anchor="middle" font-weight="bold">Phase 1: Syncing</text>
  
  <rect x="40" y="50" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-width="2"/>
  <text x="65" y="68" text-anchor="middle">Legacy</text>
  
  <rect x="150" y="50" width="50" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2"/>
  <text x="175" y="68" text-anchor="middle">New</text>
  
  <path d="M90 65 L150 65" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2"/>
  <path d="M150 65 l-5 -3 v6 z" fill="#b8541a"/>
  <text x="120" y="60" text-anchor="middle" font-size="7" fill="#b8541a">CDC via log</text>
  
  <rect x="240" y="20" width="200" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="35" text-anchor="middle" font-weight="bold">Phase 2: Cutover (Warm Rollback)</text>
  
  <rect x="260" y="50" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-width="2"/>
  <text x="285" y="68" text-anchor="middle">Legacy</text>
  
  <rect x="370" y="50" width="50" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2"/>
  <text x="395" y="68" text-anchor="middle">New</text>
  
  <path d="M370 65 L310 65" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2"/>
  <path d="M310 65 l5 -3 v6 z" fill="#b8541a"/>
  <text x="340" y="60" text-anchor="middle" font-size="7" fill="#b8541a">CDC reversed</text>
</svg>

### The failure

- The failure is turning off the legacy write path without keeping the legacy database warm. If a catastrophic bug is discovered in the new service three hours after cutover, you must roll back
- If you didn't run CDC in reverse, the legacy database is missing three hours of production data. You cannot safely roll back without losing those orders
