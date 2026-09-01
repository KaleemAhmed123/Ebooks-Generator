# Module 12 - Worth knowing about

## Tools that quietly save hours

### execa 10.0.1 and zx 8.8.5

```ts
import { execa } from "execa"

const { stdout } = await execa("git", ["rev-parse", "HEAD"])
```

- `child_process` with promises, sane errors and no shell by default
- `zx` goes further and lets you write shell-shaped scripts in TypeScript, which beats a `.sh` file nobody can debug

### tinybench 6.1.4

```ts
import { Bench } from "tinybench"

const bench = new Bench({ time: 1000 })
bench.add("json parse", () => JSON.parse(payload))
await bench.run()
console.table(bench.table())
```

- Real benchmarking with statistics, instead of two `Date.now()` calls that measure noise
