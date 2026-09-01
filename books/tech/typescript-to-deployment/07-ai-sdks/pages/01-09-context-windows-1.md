## The window, in numbers

- The context window is the ceiling on one request, input and output together, and it decides what an application can even attempt
- Windows grew from 4,000 tokens to a million in a few years, which changed which problems need retrieval and which do not

| Window | Roughly holds |
|---|---|
| 128k | a long chat, or a 300 page book |
| 200k | most agent runs, comfortably |
| **1M** | a whole codebase, or a year of one customer's tickets |

- Current Claude Opus and Sonnet models carry a **1M token window with no beta header**, and a single request can generate up to 128k output tokens
- A request may include up to 600 images or PDF pages on those models, and 100 on 200k models

### Context rot

- **Accuracy and recall fall as the window fills.** A fact at 800k tokens is measurably less likely to be used than the same fact at 20k
- This is the reason context engineering in Module 6 exists. A large window is permission to be sloppy, and being sloppy still costs quality
- **A bigger window is not a substitute for retrieval.** It is a substitute for chunking a document that nearly fits
