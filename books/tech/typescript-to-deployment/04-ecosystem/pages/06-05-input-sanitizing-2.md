### hpp

```js
app.use(hpp())
```

- `?status=paid&status=shipped` arrives as an array
- Code written for a string then calls `.toLowerCase()` on an array and throws a 500

### Where escaping belongs

- Store the original text, escape when rendering
- Escaping on the way in means the data is wrong for every other consumer
