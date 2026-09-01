### `NEXT_PUBLIC_` values are baked at build time

- Anything prefixed `NEXT_PUBLIC_` is substituted into the JavaScript sent to the browser **during the build**
- Setting it in Compose at run time does nothing. It must be a build argument, as above
- This means one image per environment for the frontend. Page 05-17 covers the consequences

### The static directory

- `.next/static` is deliberately outside `standalone` and must be copied separately, or every asset returns 404
