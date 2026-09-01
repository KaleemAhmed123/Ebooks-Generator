## Chunking

- A whole document cannot be retrieved usefully. It is too large for the window, and most of it is irrelevant to any one question
- **A chunk is the unit of retrieval.** Everything about answer quality traces back to whether the chunk boundary matched the idea boundary
- Too small and the answer is split in half. Too large and the useful sentence is buried in noise that competes with it

| Strategy | How | Fits |
|---|---|---|
| fixed size | N tokens, fixed overlap | uniform prose |
| recursive | split on paragraph, then sentence, then word | the sensible default |
| structural | split on Markdown headings | docs, wikis, runbooks |
| semantic | split where the topic shifts | expensive, occasionally worth it |

```ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 800,
  chunkOverlap: 120,
  separators: ["\n## ", "\n### ", "\n\n", "\n", " "],
})

const chunks = await splitter.splitText(markdown)
```

### The numbers, and why

- **Start at 500 to 1000 tokens with 10 to 15 percent overlap.** Overlap is what stops a sentence at a boundary from being lost by both neighbours
- Short factual documents want smaller chunks. Narrative or legal text wants larger ones

### The trick that costs nothing

- **Prefix every chunk with its document title and heading path** before embedding it
- A chunk reading `Refunds are processed in 5 to 7 days` matches nothing about shipping until it starts with `Returns Policy > Refunds`
- Store the chunk index and neighbours, so a retrieved chunk can be expanded to its surrounding context at answer time
