## Abstraction nobody asked for

- Trained on the public corpus, which is full of frameworks and enterprise patterns, it reaches for structure by default
- Ask for a function that retries a payout, and get a `RetryStrategy` interface, a `RetryStrategyFactory`, an `ExponentialBackoffStrategy`, and a configuration object

```ts
// asked for
async function retryPayout(payout: Payout): Promise<void>

// received
interface IRetryStrategy { shouldRetry(a: Attempt): boolean; nextDelay(n: number): number }
class ExponentialBackoffStrategy implements IRetryStrategy { ... }
class RetryStrategyFactory { static create(type: RetryType): IRetryStrategy { ... } }
class PayoutRetryService { constructor(private strategy: IRetryStrategy) { ... } }
```

### Why this is a defect and not a style preference

- **An interface with one implementation is not flexibility.** It is indirection with a cost and no benefit
- Every layer is a file to open when debugging, and a place a future change has to be threaded through
- **The abstraction was designed for requirements nobody has.** When the second case arrives it will not fit anyway, because the shape was guessed

### The rule

- **Write the concrete thing. Abstract on the third occurrence, when you can see the shape**
