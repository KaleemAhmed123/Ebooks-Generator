### Setting it up

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

Vitest needs Node 20 or newer and Vite 6 or newer. Configuration goes in the config file you already have.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',        // a fake DOM, so components can render
    globals: true,               // describe/it/expect without importing them
    setupFiles: ['./test/setup.ts'],
  },
});
```

```ts
// test/setup.ts
import '@testing-library/jest-dom/vitest';
```

`jsdom` is a JavaScript implementation of the DOM. It gives you `document`, `window`, and elements without launching a browser, which is why it is fast. It is also not a browser: it does not compute layout, does not apply CSS, and cannot tell you that a button is covered by a modal. Keep that limitation in mind, because it decides what belongs in the next layer up.
