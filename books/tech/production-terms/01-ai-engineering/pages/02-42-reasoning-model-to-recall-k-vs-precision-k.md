## Reasoning Model

A model trained to generate a block of intermediate reasoning before its answer.
Those thinking tokens are billed as output tokens and count against the output
ceiling for the turn, so the trade is explicit: more tokens and more wall-clock
time, in exchange for accuracy on problems that need working out.

Depth is a request parameter, not a model choice — a token budget on older
Claude models, an effort level on current ones — and returns diminish per task.
Anthropic recommends batch processing beyond roughly 32k thinking tokens,
because those requests run long enough to hit system timeouts.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A turn drawn as one bar: a large hidden block of thinking tokens precedes a short visible answer, and both are billed at the output rate">
  <rect x="4" y="16" width="60" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="33" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">prompt</text>
  <path d="M64 29 H90" stroke="#1a1a1a" stroke-width="1.2"/><path d="M92 29 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="94" y="16" width="230" height="26" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="104" y="33" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">thinking tokens — billed, returned summarised or not at all</text>
  <rect x="326" y="16" width="100" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="336" y="33" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">the answer</text>

  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the shaded block is most of the bill and most of the latency, and users never see it</text>
</svg>

**You are billed for reasoning you usually cannot read.** Track it as its own
line — Anthropic reports `usage.output_tokens_details.thinking_tokens` — or a
latency and cost regression arrives with no visible cause.

## Recall@k vs Precision@k

Recall@k: of the documents that could answer this question, how many reached
your top k. Precision@k: of the k you returned, how many are actually relevant.
One is about what you found, the other about noise.

The asymmetry decides the pipeline. A recall failure is unrecoverable — if the
answer is not in what you retrieved, no prompt, no larger model and no reranker
can produce it. A precision failure is recoverable, because noisy results can be
reranked and filtered.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A two-stage funnel: retrieval returns fifty candidates and is judged on recall, reranking narrows to three and is judged on precision, then the prompt is built">
  <rect x="4" y="14" width="150" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="27" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">retrieve top 50</text>
  <text x="12" y="38" font-family="Consolas,monospace" font-size="7.5" fill="#6b6b6b">maximise recall@50</text>
  <path d="M154 29 H180" stroke="#1a1a1a" stroke-width="1.2"/><path d="M182 29 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="184" y="14" width="134" height="30" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="192" y="27" font-family="Consolas,monospace" font-size="8" fill="#c25a35">rerank to top 3</text>
  <text x="192" y="38" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">maximise precision@3</text>
  <path d="M318 29 H344" stroke="#1a1a1a" stroke-width="1.2"/><path d="M346 29 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="348" y="14" width="78" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="356" y="33" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">the prompt</text>

  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">nothing at the second stage can recover a document the first stage never returned</text>
</svg>

**Which number is bad tells you which afternoon you are having.** Poor recall@50
sends you to chunking, embeddings and hybrid search. Good recall with bad
answers sends you to reranking, ordering and the prompt.
