## Retries are selfish

- A retry is the client deciding its request is more important than the server's recovery. It adds work to a dependency that is already struggling
- This load multiplies if multiple layers retry independently:

<svg viewBox="0 0 460 120" role="img" aria-label="A user clicks once. The frontend retries 3 times to the API. The API retries 3 times to the backend for each of those. The backend retries 3 times to the database. One click becomes 27 database queries." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="20" y="20" width="80" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="60" y="36" text-anchor="middle">Frontend</text>
  <path d="M100 32 L140 32" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="120" y="28" text-anchor="middle" font-size="8">3x</text>
  
  <rect x="140" y="20" width="80" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="180" y="36" text-anchor="middle">API</text>
  <path d="M220 32 L260 32" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="240" y="28" text-anchor="middle" font-size="8">3x</text>
  
  <rect x="260" y="20" width="80" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="300" y="36" text-anchor="middle">Backend</text>
  <path d="M340 32 L380 32" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="360" y="28" text-anchor="middle" font-size="8">3x</text>
  
  <rect x="380" y="20" width="60" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/><text x="410" y="36" text-anchor="middle">DB (struggling)</text>
  
  <text x="60" y="60" text-anchor="middle" fill="#6b6b6b">1 request</text>
  <text x="180" y="60" text-anchor="middle" fill="#6b6b6b">3 requests</text>
  <text x="300" y="60" text-anchor="middle" fill="#6b6b6b">9 requests</text>
  <text x="410" y="60" text-anchor="middle" font-weight="bold" fill="#b8541a">27 requests</text>
  
  <path d="M20 70 L440 70" stroke="#6b6b6b" stroke-dasharray="1 3"/>
  <text x="230" y="90" text-anchor="middle" font-size="9" fill="#1d4e89">Rule: retry at one layer, the one just above the failure.</text>
</svg>

- If every layer is configured to "be resilient" by retrying, the system becomes a load multiplier. A minor database hiccup generates 27× the traffic, guaranteeing the hiccup becomes a full outage

### The failure

- The infrastructure team configures the service mesh to retry. The backend engineers configure their HTTP client to retry. The frontend engineers configure their fetch wrapper to retry. Nobody talks to each other
- To fix this, only one layer should retry. The other layers should fail fast and pass the error up
