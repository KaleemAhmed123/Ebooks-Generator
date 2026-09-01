### `execFile` - no shell

```js
execFile("git", ["rev-parse", "HEAD"], (err, stdout) => ...)
```

- Same buffering, no shell. Use this instead of `exec` whenever the arguments come from anywhere but you

### `fork` - another Node process with a channel

```js
const child = fork("./worker.js")
child.send({ orderId: "o1" })
child.on("message", (result) => console.log(result))
```

- Only for Node scripts. Gives you `send` and `message` for free
