## The serial fraction caps speedup

- **Amdahl's law** (1967): if a fraction *s* of the work is serial — cannot be parallelised — then the maximum speedup with N processors is:

```
speedup ≤ 1 / (s + (1 − s) / N)
```

- Even with infinite processors the serial fraction is the floor. 5% serial → max 20× speedup, no matter how many nodes you add

<svg viewBox="0 0 460 104" role="img" aria-label="Speedup vs number of nodes for different serial fractions: 1% reaches 50x at 100 nodes; 5% flattens around 18x; 25% barely passes 3x" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="50" y1="10" x2="50" y2="90" stroke="#e0e0e4"/>
  <line x1="50" y1="90" x2="440" y2="90" stroke="#1a1a1a"/>
  <text x="46" y="96" text-anchor="end" font-size="8" fill="#6b6b6b">1</text>
  <text x="46" y="14" text-anchor="end" font-size="8" fill="#6b6b6b">50×</text>
  <text x="245" y="104" text-anchor="middle" font-size="8" fill="#6b6b6b">nodes →</text>
  <!-- s=1% -->
  <path d="M50 90 C120 40 200 24 440 14" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <text x="442" y="16" font-size="8" fill="#1d4e89">s = 1%</text>
  <!-- s=5% -->
  <path d="M50 90 C120 56 200 44 440 38" stroke="#1a1a1a" fill="none" stroke-width="1.2"/>
  <text x="442" y="40" font-size="8">s = 5%</text>
  <!-- s=25% -->
  <path d="M50 90 C120 78 200 76 440 74" stroke="#6b6b6b" fill="none" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="442" y="76" font-size="8" fill="#6b6b6b">s = 25%</text>
</svg>

### Coordination is serial work

- In a distributed system, the serial fraction is **coordination**: locks, leader election, cross-node consensus, global ordering
- Every `await` that waits for every node to agree is serial. Adding more nodes makes it slower, not faster
- This is why a well-partitioned system that avoids cross-partition coordination scales nearly linearly, and a system that coordinates on every write hits a wall

### The failure

- A cluster that got slower at 12 nodes than at 8, because every write acquired a distributed lock. The parallel fraction was irrelevant — the lock was the system
