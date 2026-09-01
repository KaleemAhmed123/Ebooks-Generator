### Where you have already met this

- `tsx` registers hooks that strip types during `load`
- OpenTelemetry auto-instrumentation patches libraries as they are loaded, which is why it has to be imported first
- Path alias resolvers rewrite specifiers during `resolve`

### Two cautions

- Hooks run in a separate thread from the application, so they cannot share state with it directly
- Anything that rewrites source affects stack traces. Emit source maps or debugging becomes guesswork
