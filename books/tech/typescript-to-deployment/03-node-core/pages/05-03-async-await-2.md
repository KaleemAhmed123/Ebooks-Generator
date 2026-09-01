### `await` in a loop

```js
for (const id of orderIds) {
  await sendEmail(id)         // one at a time
}

await Promise.all(orderIds.map(sendEmail))   // all at once
```

- All at once is faster, and will also happily open 10,000 connections. Bound it with `p-limit`
