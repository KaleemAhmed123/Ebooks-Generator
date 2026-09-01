### Images coming out

```ts
import { generateImage } from "ai"

const { image } = await generateImage({
  model: openai.image("gpt-image-1"),
  prompt: "A flat illustration of a delivery van, mint background",
  size: "1024x1024",
  seed: 1234,
})

await writeFile("van.png", image.uint8Array)
```

- `n` generates several at once, and `seed` makes a result repeatable, which is what allows a regeneration to keep the same look

### The backend concerns

- **Generation takes seconds to a minute.** Queue it and return a job id, as Booklet 6 describes
- The result is bytes, not a URL. **Upload to object storage and return your own URL**, or the image disappears when a provider link expires
- Provider-hosted image URLs are usually short-lived, and a user's saved link breaking is a support ticket
