### Creating one

- The brand cannot be produced by accident, so you go through a constructor

```ts
function orderId(value: string): OrderId {
  return value as OrderId
}

refund(orderId("o1"))   // fine
```

- The single `as` lives inside that one function, where it is reviewed once
- Everywhere else stays honest

### Where it pays for itself

- Ids of different entities, especially in a codebase with many services
- Values that look alike but must not mix: cents vs rupees, seconds vs milliseconds
