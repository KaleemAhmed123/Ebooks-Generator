## Classes in TypeScript

- JavaScript classes carry no information about what a field holds or who may touch it
- TypeScript adds types to the fields and **access modifiers** deciding what is reachable from outside

```ts
class Wallet {
  public  readonly sellerId: string
  private balancePaise: number
  protected currency = "INR"

  constructor(sellerId: string, opening: number) {
    this.sellerId = sellerId
    this.balancePaise = opening
  }

  credit(amount: number): void {
    this.balancePaise += amount
  }
}
```

| Modifier | Reachable from |
|---|---|
| `public` | anywhere. The default |
| `private` | this class only |
| `protected` | this class and subclasses |
| `readonly` | assignable in the constructor, never after |

### Parameter properties

```ts
class Wallet {
  constructor(private readonly db: PrismaClient) {}
}
```

- Declares the field and assigns it in one line, which is why every NestJS constructor looks like this
- It emits real JavaScript, so it is **not erasable** and Node's type stripping rejects it
