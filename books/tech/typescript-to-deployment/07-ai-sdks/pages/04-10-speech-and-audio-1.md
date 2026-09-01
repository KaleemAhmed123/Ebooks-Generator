## Speech

- Audio is a large share of real product work: call recordings, voice notes, meeting transcripts, dictated support tickets
- Two operations cover almost all of it, and both are one function in the AI SDK

### Speech to text

```ts
import { transcribe } from "ai"
import { openai } from "@ai-sdk/openai"
import { readFile } from "node:fs/promises"

const transcript = await transcribe({
  model: openai.transcription("whisper-1"),
  audio: await readFile("call.mp3"),
})

transcript.text
transcript.segments            // timestamped pieces
transcript.language
transcript.durationInSeconds
```

- **`segments` is the field that matters for a product.** Timestamps let a user click a line and jump to that moment
- Streaming transcription exists for live audio, yielding partial and final segments as they settle

### Text to speech

```ts
import { generateSpeech } from "ai"

const { audio } = await generateSpeech({
  model: openai.speech("tts-1"),
  text: "Your order has shipped.",
  voice: "alloy",
})
```
