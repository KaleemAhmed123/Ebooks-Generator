## Blue-green deployment

- Deploying by updating running instances one by one (in-place) is risky. If the new version crashes on boot, your fleet capacity drops during the rollout
- Blue-green deployment eliminates this risk by using two identical production environments. The router points all live traffic to the "Blue" environment. You deploy the new version to the completely idle "Green" environment
- You run integration tests against Green. If they pass, you flip the router to point all traffic to Green. If anything goes wrong, you instantly flip the router back to Blue

<svg viewBox="0 0 460 140" role="img" aria-label="Blue-Green Deployment. Router points to Blue (v1). Green (v2) is idle. Router flips to Green instantly." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="68" text-anchor="middle">Router</text>
  
  <rect x="150" y="20" width="120" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="210" y="44" text-anchor="middle" font-weight="bold">Blue Environment</text>
  <text x="210" y="55" text-anchor="middle" font-size="7">v1 (Old)</text>
  
  <rect x="150" y="80" width="120" height="40" rx="3" fill="#e2fcf3" stroke="#4a8f3c"/>
  <text x="210" y="104" text-anchor="middle" font-weight="bold">Green Environment</text>
  <text x="210" y="115" text-anchor="middle" font-size="7">v2 (New)</text>
  
  <path d="M80 65 L150 40" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M150 40 l-5 -2 v5 z" fill="#1a1a1a" transform="rotate(-25 150 40)"/>
  <text x="110" y="45" text-anchor="middle" font-size="7">Current Traffic</text>
  
  <path d="M80 65 L150 100" stroke="#4a8f3c" fill="none" stroke-width="2" stroke-dasharray="2"/>
  <path d="M150 100 l-5 -4 v6 z" fill="#4a8f3c" transform="rotate(25 150 100)"/>
  <text x="110" y="95" text-anchor="middle" font-size="7" fill="#4a8f3c">Instant flip</text>
</svg>

### The failure

- The failure mode is database migrations that only work forward. When the router flips to Green, Green runs a migration that drops a column
- If you find a bug and flip back to Blue, Blue crashes because the column it expects is gone. In blue-green, the database is shared. All database migrations must be backward-compatible with the old code (add only, never drop), or instant rollback is impossible
