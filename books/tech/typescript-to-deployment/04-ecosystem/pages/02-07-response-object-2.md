### Cookies

```js
res.cookie("session", token, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 86400000,
})
res.clearCookie("session")
```

- `httpOnly` keeps it away from JavaScript, which is what makes token theft by XSS harder
