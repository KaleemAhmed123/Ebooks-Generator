## Cache-Control

- The `Cache-Control` HTTP header is how your origin server tells the CDN and the browser what they are allowed to store. According to RFC 9111, this header overrides all default CDN behaviors

| Directive | What it means |
|---|---|
| `public` / `private` | `public` means a shared cache (CDN) can store it. `private` means only the user's browser can store it. |
| `max-age=60` | The browser can cache this for 60 seconds. |
| `s-maxage=3600` | The shared cache (CDN) can cache this for 3,600 seconds, overriding `max-age`. |
| `immutable` | This file will never change. (Used for hashed filenames like `app.v2a9f.js`). |
| `no-store` | Do not store this anywhere, ever. Fetch it from the origin every time. |
| `no-cache` | You can store it, but you **must** revalidate it with the origin before serving it. |

### The failure

- The failure is misunderstanding `no-cache`. Many developers use `Cache-Control: no-cache` thinking it means "do not store this file." It does not. It means "you can store it, but you have to ask me if it has changed before you serve it"
- If you want to guarantee that a file is never written to a disk cache, you must use `no-store`. If you accidentally use `no-cache` on a sensitive banking API, the browser might write the JSON to the user's hard drive, where malware can find it
