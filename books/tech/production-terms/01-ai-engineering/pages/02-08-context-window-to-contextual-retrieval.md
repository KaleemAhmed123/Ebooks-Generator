## Context Window

The maximum number of tokens a model can attend to in one request, prompt and
output together. Claude Opus 5 and Sonnet 5 carry one million tokens with 128K
maximum output as of September 2026; Haiku 4.5 carries 200K.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One context window is a single budget divided between system prompt, tool definitions, conversation history, retrieved chunks and the headroom the answer needs">
  <rect x="4" y="18" width="66" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="37" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">system</text>
  <rect x="70" y="18" width="54" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="97" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">tools</text>
  <rect x="124" y="18" width="98" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="173" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">history</text>
  <rect x="222" y="18" width="150" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="297" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">retrieved chunks</text>
  <rect x="372" y="18" width="84" height="22" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="414" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">the answer</text>
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">ONE WINDOW</text>
  <text x="4" y="58" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">every token spent on the left is a token the reply cannot have —</text>
  <text x="4" y="70" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">the prompt fits, and the model appears to refuse to finish</text>
</svg>

The model has no memory between calls. A conversation that feels continuous is
your application resending the entire history every turn, which is why long
chats get slower and cost more.

**Going over the window gives a hard error or silent truncation, depending on
the provider.** Truncation is the dangerous one: your summary of a long document
quietly omits its opening, the answer reads plausibly, and nothing records that
half the input was discarded.

## Contextual Retrieval

Prepending a short generated description of where a chunk sits in its document
before embedding it. "The rate increased by 3%" is close to unretrievable alone
— which rate, whose report, which year — and the embedding cannot encode what is
not in the text.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bare chunk is ambiguous; prefixing it with a generated description of its document and section produces one embedding carrying both">
  <rect x="4" y="10" width="200" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="26" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">"the rate increased by 3%"</text>
  <text x="14" y="50" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">which rate? whose report? which year?</text>
  <path d="M212 22 H244" stroke="#1a1a1a" stroke-width="1.2"/><path d="M244 22 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="250" y="4" width="206" height="18" fill="#fdece5" stroke="#c25a35" stroke-width="1.3"/>
  <text x="258" y="17" font-family="Georgia,serif" font-size="8.5" fill="#c25a35">Acme Q3 2025 report, interest rates</text>
  <rect x="250" y="24" width="206" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="258" y="37" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">"the rate increased by 3%"</text>
  <text x="250" y="58" font-family="Georgia,serif" font-size="9" fill="#c25a35">one embedding, now carrying both</text>
</svg>

Anthropic's 2024 experiment generated that preamble with Claude 3 Haiku and
reported top-20 retrieval failure falling from 5.7% to 3.7%; combined with BM25
it fell to 2.9%, and with reranking added, to 1.9%. The stated one-time cost was
$1.02 per million document tokens using prompt caching.

**Store the generated context separately from the original text.** You will want
to regenerate it after a prompt change or a model change, and doing that without
reparsing every source document is the difference between an afternoon and a
week.
