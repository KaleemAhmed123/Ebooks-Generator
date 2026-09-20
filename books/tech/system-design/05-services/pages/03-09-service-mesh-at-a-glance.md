## Service mesh at a glance

- A service mesh (like Istio or Linkerd) solves the language proliferation problem of client-side discovery. It injects a tiny proxy (a "sidecar") next to every single service instance
- Your application code thinks it is talking to a local server. In reality, the sidecar intercepts the traffic, handles service discovery, encrypts the connection (mTLS), runs retries, records metrics, and sends the traffic to the destination's sidecar

<svg viewBox="0 0 460 140" role="img" aria-label="Service Mesh. App A talks to Proxy A. Proxy A talks to Proxy B over mTLS. Proxy B talks to App B." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="160" height="80" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="4"/>
  <text x="100" y="35" text-anchor="middle" font-size="7">Pod A</text>
  
  <rect x="40" y="45" width="50" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="65" y="68" text-anchor="middle">App A</text>
  
  <rect x="110" y="45" width="50" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="135" y="68" text-anchor="middle">Proxy A</text>
  
  <path d="M90 65 L110 65" stroke="#1a1a1a" fill="none"/>
  
  <rect x="280" y="20" width="160" height="80" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="4"/>
  <text x="360" y="35" text-anchor="middle" font-size="7">Pod B</text>
  
  <rect x="300" y="45" width="50" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="325" y="68" text-anchor="middle">Proxy B</text>
  
  <rect x="370" y="45" width="50" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="395" y="68" text-anchor="middle">App B</text>
  
  <path d="M350 65 L370 65" stroke="#1a1a1a" fill="none"/>
  
  <path d="M160 65 L300 65" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M300 65 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="230" y="60" text-anchor="middle" font-weight="bold">mTLS</text>
</svg>

- You buy absolute uniformity—every service, regardless of language, gets the same retry logic and metrics—at the cost of two extra network hops per request

### The failure

- The failure is turning on a service mesh without removing the retry logic from your application code. If your app retries 3 times, and the mesh retries 3 times, you are now executing 9 requests for every failure
- Service meshes are complex. If you have 5 microservices, adding a mesh introduces more problems than it solves. They are designed for organizations with hundreds of services
