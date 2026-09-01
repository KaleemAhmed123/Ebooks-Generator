## Cookies and sessions

- A cookie is storage the browser attaches to every request, which is what makes it convenient and what makes CSRF possible

```js
import cookieParser from "cookie-parser"
app.use(cookieParser(process.env.COOKIE_SECRET))

req.cookies.session          // plain
req.signedCookies.session    // verified against the secret
```

- A signed cookie is tamper evident, not encrypted. The value is still readable

### Server sessions

```js
import session from "express-session"
import { RedisStore } from "connect-redis"

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 86400000 },
}))
```

- **The default store is in memory and leaks.** It is fine for a demo and unusable with more than one instance
- `saveUninitialized: false` stops a session row being created for every anonymous visitor
