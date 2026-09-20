## 5. What if communication fails?

- When a timeout fires, or a connection drops, the caller must navigate a decision tree. Silence is ambiguous, so the tree must handle the worst case (the work was done)

<svg viewBox="0 0 460 180" role="img" aria-label="A decision tree for network failure. Fails → Is it idempotent? No → Reconcile state. Yes → Have attempts left? Yes → Retry with backoff. No → Core feature? Yes → Fail operation. No → Degrade gracefully." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="10" width="100" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="230" y="26" text-anchor="middle">Network fails</text>
  <path d="M230 34 L230 46" stroke="#1d4e89"/><path d="M230 46 l-3 -6 h6 z" fill="#1d4e89"/>
  
  <rect x="170" y="50" width="120" height="24" rx="3" fill="#fff" stroke="#1a1a1a"/><text x="230" y="66" text-anchor="middle">Is it idempotent?</text>
  <path d="M170 62 L120 62 L120 86" stroke="#1a1a1a" fill="none"/><path d="M120 86 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="145" y="58" text-anchor="middle" font-size="8">No</text>
  <path d="M290 62 L340 62 L340 86" stroke="#1a1a1a" fill="none"/><path d="M340 86 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="315" y="58" text-anchor="middle" font-size="8">Yes</text>
  
  <rect x="60" y="90" width="120" height="24" rx="3" fill="#fff" stroke="#1a1a1a"/><text x="120" y="106" text-anchor="middle">Reconcile state</text>
  
  <rect x="280" y="90" width="120" height="24" rx="3" fill="#fff" stroke="#1a1a1a"/><text x="340" y="106" text-anchor="middle">Under retry budget?</text>
  <path d="M280 102 L230 102 L230 126" stroke="#1a1a1a" fill="none"/><path d="M230 126 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="255" y="98" text-anchor="middle" font-size="8">No</text>
  <path d="M400 102 L440 102 L440 146" stroke="#1a1a1a" fill="none"/><path d="M440 146 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="420" y="98" text-anchor="middle" font-size="8">Yes</text>
  
  <rect x="170" y="130" width="120" height="24" rx="3" fill="#fff" stroke="#1a1a1a"/><text x="230" y="146" text-anchor="middle">Core feature?</text>
  <path d="M170 142 L120 142 L120 166" stroke="#1a1a1a" fill="none"/><path d="M120 166 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="145" y="138" text-anchor="middle" font-size="8">Yes</text>
  <path d="M290 142 L340 142 L340 166" stroke="#1a1a1a" fill="none"/><path d="M340 166 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="315" y="138" text-anchor="middle" font-size="8">No</text>
  
  <rect x="60" y="170" width="120" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="120" y="186" text-anchor="middle">Fail operation</text>
  
  <rect x="280" y="170" width="120" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="340" y="186" text-anchor="middle">Degrade gracefully</text>
  
  <rect x="390" y="150" width="100" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="440" y="166" text-anchor="middle">Retry (backoff/jitter)</text>
</svg>

- If a step is missing from the tree, you have a bug. Retrying without checking idempotency creates duplicates. Failing a non-core feature without degrading gracefully breaks the whole page for one minor widget
- **Compensation** (Booklet 04, sagas) is required if the flow fails *after* partial state was written
