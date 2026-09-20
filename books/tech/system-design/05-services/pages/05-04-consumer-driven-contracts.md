## Consumer-driven contract tests

- In a large organization, Service A cannot possibly know all the ways that Services B, C, and D are using its API. If Service A deletes the `nickname` field because it seems unused, it might crash Service D
- Consumer-Driven Contracts (CDC tests) solve this. Each consumer writes a test asserting exactly what it expects the provider to return (e.g., "I call `/user/1`, I expect a 200 and a JSON object with a `nickname` string")
- These tests are recorded as a "contract file" (using a tool like Pact) and given to the provider

<svg viewBox="0 0 460 140" role="img" aria-label="Consumer Driven Contracts. Consumer writes expectations. Provider downloads them and runs them against its own code in CI." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="80" y="35" text-anchor="middle" font-weight="bold">1. Consumer</text>
  <text x="80" y="55" text-anchor="middle">Writes tests:</text>
  <text x="80" y="70" text-anchor="middle" font-size="7">"Expects { nickname }"</text>
  <text x="80" y="85" text-anchor="middle" font-size="7">"Expects 200 OK"</text>

  <rect x="190" y="45" width="80" height="50" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="65" text-anchor="middle" font-weight="bold">Contract File</text>
  <text x="230" y="80" text-anchor="middle">(Pact broker)</text>
  
  <path d="M140 70 L190 70" stroke="#1a1a1a" fill="none"/>
  <path d="M190 70 l-5 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="320" y="20" width="120" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="380" y="35" text-anchor="middle" font-weight="bold">2. Provider CI</text>
  <text x="380" y="55" text-anchor="middle">Downloads contract</text>
  <text x="380" y="70" text-anchor="middle">Runs against its code</text>
  <text x="380" y="85" text-anchor="middle" fill="#cc0000" font-weight="bold">Fails if broken</text>
  
  <path d="M270 70 L320 70" stroke="#1a1a1a" fill="none"/>
  <path d="M320 70 l-5 -3 v6 z" fill="#1a1a1a"/>
</svg>

- The provider must run all consumer contracts in its own Continuous Integration (CI) pipeline. If a provider's PR fails a consumer's contract test, the PR cannot be merged. The provider is forced to talk to the consumer before making the change

### The failure

- The failure mode is relying solely on the provider's own unit tests. The provider tests its new `/v2` behavior, sees green, deploys, and breaks production because it didn't know a consumer was relying on an undocumented `/v1` quirk
- Without consumer-driven contracts, you only find out you broke a caller when the pager goes off
