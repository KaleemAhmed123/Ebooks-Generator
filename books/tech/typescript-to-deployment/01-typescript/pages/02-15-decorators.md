## Decorators

- Some behavior is not about what a function computes but about how it is treated: this method is an HTTP route, this class can be injected, this field must be validated
- Writing that as wrapper functions buries the intent under plumbing
- A **decorator** attaches that information to a class, method, field or parameter, declared right where it applies
- It is a function that runs when the class is defined, receiving the thing it decorates and able to replace or annotate it
- This is the mechanism NestJS is built on, and it is why a Nest controller reads as a list of declarations

```ts
function LogCalls(original: Function, context: ClassMethodDecoratorContext) {
  return function (this: unknown, ...args: unknown[]) {
    console.log(`calling ${String(context.name)}`)
    return original.apply(this, args)
  }
}

class OrderService {
  @LogCalls
  cancel(orderId: string) {
    return db.order.update({ where: { id: orderId }, data: { status: "cancelled" } })
  }
}
```

### Two incompatible versions exist

- **Standard decorators**, in TypeScript 5 and later, are on their way into JavaScript itself and need no flag
- **Legacy decorators** need `experimentalDecorators` and are what NestJS, TypeORM and class-validator still use
- The two are not interchangeable, and mixing them produces errors that make no sense
- Check which one a library expects before enabling either

### The cost

- Decorators emit real JavaScript, so they are **not erasable** and Node's type stripping refuses them
- Anything relying on `reflect-metadata` for dependency injection is doing runtime reflection, which is invisible to the compiler
