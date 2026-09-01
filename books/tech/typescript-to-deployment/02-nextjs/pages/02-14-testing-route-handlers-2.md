### Mocking `cookies` and `headers`

```ts
vi.mock("next/headers", () => ({
  cookies: async () => ({ get: () => ({ value: "test-session" }) }),
  headers: async () => new Headers({ "x-request-id": "r_1" }),
}))
```

- Those read from a request context that only exists during a real request, so they must be mocked
- Server Actions test the same way, since they are also just exported async functions
