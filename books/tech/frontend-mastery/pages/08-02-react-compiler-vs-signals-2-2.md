## React Compiler vs. The Signals Revolution - continued

- **Signals** won the performance benchmark wars. If you are building high-frequency updating UIs (like stock tickers or complex web games), SolidJS or Svelte 5 will outperform React.
- **The React Compiler** answered the same problem for the existing React ecosystem. Teams delete `useMemo` and `useCallback` and keep the performance, without rewriting anything or learning a new reactive primitive.

### Turning it on

```bash
npm install -D babel-plugin-react-compiler@latest eslint-plugin-react-hooks@latest
```

In Next.js 16 it is a stable config flag, off by default while build-time data is collected. Expect slower builds when you enable it, because the compiler runs through Babel.

```ts
// next.config.ts
const nextConfig = { reactCompiler: true };
```

The compiler targets React 19 and supports React 17 and 18 through a runtime package. Turn on the `recommended-latest` preset of `eslint-plugin-react-hooks`: it reports the components the compiler had to skip and why, which is the fastest way to find code that breaks the Rules of React.

:::mint
**Do not hand-optimize around the compiler.** Once it is on, delete the manual memoization. In exchange you owe it the Rules of React: no mutating props or state, no side effects during render. A component that breaks them is skipped silently rather than miscompiled, so the ESLint plugin is how you find out. `"use no memo"` at the top of a function opts that one component out.
:::
