## Build arguments against runtime environment

| | `ARG` | `ENV` |
|---|---|---|
| Available | During the build only | At run time |
| Set by | `--build-arg`, or Compose `build.args` | Compose `environment` or `env_file` |
| Ends up in the image | Only if copied into an `ENV` | Yes |
| Changeable without rebuilding | No | Yes |

### The rule

- **Anything that differs per environment should be runtime `ENV`.** One image, many environments
- Only values the compiler must see belong in `ARG`

### The exception that forces a rebuild

- Frontend frameworks substitute public values into the browser bundle during the build. `NEXT_PUBLIC_API_URL` and `VITE_*` are the common cases
- These cannot be runtime configuration. One image per environment for the frontend, and the environment name becomes part of the tag

```yaml
services:
  shop-ui:
    build:
      context: .
      args:
        NEXT_PUBLIC_API_URL: https://api.example.com
```
