## Test Isolation

Every test runs without depending on, or damaging, any other. No shared row, no
shared singleton, no required order.

The check costs one CI run: execute the suite in a random order, then in
parallel. Anything that only passes in file order was leaning on a neighbour, and
the dependency was invisible until that moment.

**Isolation is what makes sharding possible.** A suite that must run in one
process in one order cannot be split across machines, so its runtime is fixed no
matter what hardware you buy — and that ceiling arrives long before anyone traces
it back to the shared fixture.

## Test Pyramid

Mike Cohn's shape from *Succeeding with Agile* (2009): many fast unit tests at
the base, fewer service-level tests above, very few driving the interface.

<svg viewBox="0 0 460 98" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pyramid with a wide base of fast unit tests, a narrower band of integration tests, and a small tip of end-to-end tests, annotated with Google's suggested seventy twenty ten mix">
  <polygon points="110,10 137,36 83,36" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <polygon points="83,36 137,36 164,62 56,62" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <polygon points="56,62 164,62 191,88 29,88" fill="#e2fcf3" stroke="#0d7a7a" stroke-width="1.4"/>
  <text x="205" y="30" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">10%  end-to-end — minutes, hard to place</text>
  <text x="205" y="56" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">20%  integration — one real dependency</text>
  <text x="205" y="82" font-family="Georgia,serif" font-size="9.5" fill="#0d7a7a">70%  unit — milliseconds, exact failure</text>
</svg>

Inverted it becomes the ice-cream cone: a suite dominated by interface tests that
Fowler calls brittle, expensive to write and time consuming to run.

**The pyramid is about feedback time, not test counts.** Copy the ratio while
every unit test still opens a database connection and you have the shape without
the speed — which was the only reason for the shape.
