## Provider is down

- A retry loop saves messages, but it does not stop the bleeding if the provider is down for an hour. Workers will spin uselessly
- **Circuit Breaker:** Wrap the provider API call in a circuit breaker (→05). If 50% of calls fail in 10 seconds, the circuit opens. The worker stops calling the API entirely and instantly routes messages to a fallback or delays them
- **Fallback provider:** If Twilio is down, fail over to SNS. But beware: you must capacity-plan the fallback. If your fallback usually takes 1% of traffic and suddenly takes 100%, it will get rate-limited and die immediately

<svg viewBox="0 0 460 100" role="img" aria-label="Circuit breaker routes to fallback provider" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="70" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="55" y="55" text-anchor="middle" font-weight="bold" fill="#1d4e89">Worker</text>
  
  <rect x="130" y="20" width="80" height="60" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="170" y="45" text-anchor="middle" font-weight="bold">Circuit</text>
  <text x="170" y="60" text-anchor="middle" font-weight="bold" fill="#b8541a">OPEN</text>
  
  <rect x="280" y="10" width="80" height="35" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="320" y="32" text-anchor="middle" font-weight="bold" fill="#b8541a">Twilio (Down)</text>
  
  <rect x="280" y="60" width="80" height="35" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="320" y="82" text-anchor="middle" font-weight="bold" fill="#1d4e89">SNS (Fallback)</text>
  
  <path d="M90 50 L130 50" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M210 50 L280 75" stroke="#1d4e89" fill="none" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M210 50 L280 25" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="4 4"/>
  <line x1="240" y1="25" x2="250" y2="45" stroke="#b8541a" stroke-width="2"/>
  <line x1="250" y1="25" x2="240" y2="45" stroke="#b8541a" stroke-width="2"/>
</svg>

### The failure

- Failing over 10,000 QPS to a secondary provider where you only have a 100 QPS contract limit. You achieve nothing except angering two vendors

:::interview
Twilio is down. Your circuit breaker flips seamlessly to AWS SNS. One second later, your SNS account is suspended for limit violations. How do you design a safe failover?

You must capacity-plan your failovers. If you normally send 1,000 QPS to Twilio and 10 QPS to SNS, failing over instantly sends 1,000 QPS to SNS, breaching your quota. You must negotiate equal limits for both providers or gracefully degrade and queue non-critical messages.
:::
