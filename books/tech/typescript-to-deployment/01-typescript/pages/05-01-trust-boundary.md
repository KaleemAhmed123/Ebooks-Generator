# Module 5 - TypeScript at the service boundary

## The trust boundary problem

- A **trust boundary** is any point where data arrives from outside your process
  - an HTTP request body, a queue message, a webhook, an environment variable
- Inside the boundary, types are reliable. You wrote those values yourself
- Crossing the boundary, a type is only a *claim*
- `as User` checks nothing. It tells the compiler to stop asking

### The rule

- Validate once at the boundary
- Then let the checked value flow inward, and trust it everywhere after
