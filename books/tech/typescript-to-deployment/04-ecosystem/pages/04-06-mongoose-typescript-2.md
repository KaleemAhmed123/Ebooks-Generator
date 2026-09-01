### Connection settings that matter

```ts
mongoose.connect(url, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
```

- Without `serverSelectionTimeoutMS`, a wrong URL hangs for 30 seconds before telling you
