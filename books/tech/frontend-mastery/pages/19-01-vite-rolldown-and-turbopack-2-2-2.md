### Which one you actually use

You mostly do not choose. The framework chooses.

| Building | Bundler |
|---|---|
| React or Vue single page app | Vite 8, Rolldown underneath |
| Next.js | Turbopack, already the default |
| Astro, SvelteKit, Nuxt, Remix | Vite, chosen by the framework |
| A library rather than an app | tsdown or Rolldown directly |
| An existing Webpack app that works | Webpack, until it hurts |

The pattern worth taking away is not which tool won. It is that the whole JavaScript toolchain moved to Rust, for the same reason: the work is parallel, and the language it was written in could not parallelize it.
