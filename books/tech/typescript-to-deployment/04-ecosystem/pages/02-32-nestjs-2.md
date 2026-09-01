## NestJS - continued

### What you get

- **Dependency injection.** Constructor parameters are resolved from a container, which makes swapping a real repository for a fake in tests trivial
- **Modules.** Explicit boundaries with declared imports and exports
- **Guards, interceptors, pipes and filters.** Named slots for auth, logging, validation and error mapping
- **One structure.** Every Nest codebase looks the same, which matters on a large team
- Runs on Express by default, or Fastify with one line

### What it costs

- Decorators and DI are a real learning curve
- More files for the same feature
- On a service with six endpoints, the structure costs more than it returns
