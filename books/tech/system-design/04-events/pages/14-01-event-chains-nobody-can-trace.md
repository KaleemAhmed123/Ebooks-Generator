# Module 14 - Event-driven pitfalls

## Event chains nobody can trace

- Five services and twelve topics can implement a workflow that exists nowhere in any one file — Fowler's warning about event notification generalises to any choreographed system: the flow "is not explicit in any program text," only in the sum of every service's independent subscriptions

<svg viewBox="0 0 460 100" role="img" aria-label="A tangled graph of five services with crossing arrows and no obvious start or end." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8">
  <circle cx="90" cy="30" r="16" fill="none" stroke="#333"/><text x="90" y="33" text-anchor="middle" font-size="6.5">A</text>
  <circle cx="220" cy="20" r="16" fill="none" stroke="#333"/><text x="220" y="23" text-anchor="middle" font-size="6.5">B</text>
  <circle cx="350" cy="35" r="16" fill="none" stroke="#333"/><text x="350" y="38" text-anchor="middle" font-size="6.5">C</text>
  <circle cx="150" cy="80" r="16" fill="none" stroke="#333"/><text x="150" y="83" text-anchor="middle" font-size="6.5">D</text>
  <circle cx="300" cy="80" r="16" fill="none" stroke="#bf4c28"/><text x="300" y="83" text-anchor="middle" font-size="6.5" fill="#bf4c28">E</text>
  <path d="M104 38 L206 26" stroke="#999"/>
  <path d="M104 38 L142 68" stroke="#999"/>
  <path d="M206 30 L164 70" stroke="#999"/>
  <path d="M234 26 L336 34" stroke="#999"/>
  <path d="M164 82 L284 81" stroke="#999"/>
  <path d="M336 46 L300 66" stroke="#999"/>
</svg>

- A change to what one service publishes can silently break a consumer three hops away that nobody on the publishing team knows exists, because nothing forces a producer to know its own consumers (page 2 covers the ownership side directly)
- Correlation and causation ids (Module 10, page 4) make one run of a chain traceable after the fact; they do not make the chain's shape visible ahead of time. Tracing an incident and understanding the system's design are different problems, and ids only solve the first one

### The failure

- A change in service A that breaks service E, five hops downstream, with a deploy log that shows nothing wrong: A's own tests pass, A's own consumers of the topics A reads are fine, and nobody on A's team subscribes to E to know it exists. The failure surfaces as E's alert, not A's
