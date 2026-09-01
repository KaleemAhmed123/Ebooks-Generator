## Tokens

- A model does not read characters or words. It reads **tokens**, which are chunks of text produced by a fixed splitter
- Roughly, one token is four characters of English, so 1,000 tokens is about 750 words
- Everything about cost, speed and limits is measured in tokens, which is why the unit matters to a backend engineer
- Non-English text and code split into more tokens per character, so a Hindi or JSON payload costs more than its length suggests

```ts
import { encoding_for_model } from "tiktoken"

const enc = encoding_for_model("gpt-4o")
enc.encode("Kaleem placed an order").length   // 5
enc.free()
```

### The context window

- The **context window** is the maximum number of tokens one request may contain, input and output together
- It is a hard limit. Exceed it and the API rejects the request rather than truncating quietly
- A long chat, a large document and a big tool result all compete for the same budget

| Term | Means |
|---|---|
| input tokens | everything you send: system text, history, tools, documents |
| output tokens | what the model generates |
| context window | the ceiling on the two together |

### The two habits worth forming now

- **Count before you send.** A token counting endpoint or a local encoder is cheaper than a rejected request
- **Budget the window explicitly.** Decide how many tokens history, retrieved documents and tool results are each allowed, rather than letting whichever grows fastest win
