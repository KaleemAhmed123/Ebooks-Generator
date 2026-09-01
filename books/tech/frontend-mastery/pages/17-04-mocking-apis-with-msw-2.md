### Setting up MSW

```js
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept any GET request to /api/user
  http.get('/api/user', () => {
    // Return a fake JSON response
    return HttpResponse.json({
      id: 'u_123',
      name: 'John Doe',
    })
  }),

  // You can even simulate Server Errors easily to test your Error Boundaries!
  http.post('/api/checkout', () => {
    return new HttpResponse(null, { status: 500 })
  })
]
```

Because MSW operates at the network level, you can use the exact same `handlers.js` file for your Vitest tests, your Playwright E2E tests, and your local development environment if the backend team hasn't finished building the API yet!
