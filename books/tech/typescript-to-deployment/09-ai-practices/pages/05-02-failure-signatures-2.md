### 5. The test that cannot fail

```ts
expect(result).toBeDefined()
expect(mockFn).toHaveBeenCalled()
```

### 6. The swallowed error

```ts
try { await charge() } catch (e) { logger.warn(e) }   // and then continues
```

- **Adding a `try/catch` is the default response to a failing test.** It is almost never the fix, and it hides the failure permanently
