## Images, in and out

### Images going in

- Every current frontier model reads images. A photographed receipt, a screenshot of an error, a chart, a damaged product
- It is the same request with a different content part, and it is the fastest way to remove a form from a product

```ts
const { text } = await generateText({
  model: anthropic("claude-opus-5"),
  messages: [{ role: "user", content: [
    { type: "text", text: "What is damaged, and how badly?" },
    { type: "file", mediaType: "image/jpeg", data: await readFile("claim.jpg") },
  ]}],
})
```

- **An image costs tokens roughly by area.** A 2000 by 2000 photograph is over a thousand tokens, so resize before sending
- In AI SDK 7 the image part is `{ type: "file", mediaType: "image/..." }`. The old `{ type: "image" }` was renamed
