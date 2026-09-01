### class-validator

```ts
class CreateOrder {
  @IsString() sellerId: string
  @IsInt() @Min(1) total: number
}
```

- Decorator based, and what NestJS uses by default

### The recommendation

- **Zod** unless you have a specific reason. Largest ecosystem, best documentation
- **TypeBox** with Fastify, **Valibot** where size is measured, **class-validator** inside Nest
