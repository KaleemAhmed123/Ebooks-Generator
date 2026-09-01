## Buffers

- A `Buffer` is a fixed length chunk of raw bytes outside the JavaScript heap
- JavaScript strings are UTF-16 text. Files, sockets and crypto are bytes

```js
const buf = Buffer.from("hello")
buf              // <Buffer 68 65 6c 6c 6f>
buf.length       // 5
buf.toString()   // "hello"

Buffer.from("hello").toString("base64")     // "aGVsbG8="
Buffer.from("aGVsbG8=", "base64").toString() // "hello"
```

### Length is bytes, not characters

```js
"héllo".length                    // 5 characters
Buffer.from("héllo").length       // 6 bytes
```

- `é` is two bytes in UTF-8
- Slicing a buffer at the wrong offset splits a character in half. That is where mojibake comes from

### Allocating

```js
Buffer.alloc(10)         // 10 zeroed bytes, safe
Buffer.allocUnsafe(10)   // faster, contains whatever was in memory
```

- `allocUnsafe` can hand you fragments of old data. Only use it when you overwrite every byte immediately
