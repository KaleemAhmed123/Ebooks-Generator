## Query Rewriting / HyDE

*hypothetical document embeddings*

Transforming the user's question before retrieval. "What about the second one?"
carries no searchable content — the meaning lives in the previous turns — and
rewriting it against the history turns an impossible query into an easy one.

The other case is vocabulary mismatch. Users write "why is my thing broken"; the
manual says "diagnostic procedure for fault code 12". HyDE asks a model to write
a hypothetical answer and embeds that instead of the question. It lands nearer
real documents because it uses document language, and it does not matter that
the content is invented — it is only ever a search key.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The raw question is embedded far from the documents, while a hypothetical answer generated from it embeds close to them">
  <rect x="4" y="10" width="118" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="25" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">raw question</text>
  <path d="M122 21 H300" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 2"/><path d="M302 21 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="150" y="17" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">everyday wording — lands far away</text>

  <rect x="4" y="44" width="118" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="59" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">raw question</text>
  <path d="M122 55 H154" stroke="#1a1a1a" stroke-width="1.2"/><path d="M156 55 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="158" y="44" width="140" height="22" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="166" y="59" font-family="Consolas,monospace" font-size="8" fill="#c25a35">invented answer</text>
  <path d="M298 55 H330" stroke="#1a1a1a" stroke-width="1.2"/><path d="M332 55 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="334" y="10" width="92" height="56" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="380" y="42" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">the index</text>
  <text x="4" y="82" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the fabricated answer is never shown to anyone — it exists only to be embedded</text>
</svg>

**Both add a model call to every request, on the hot path.** Close to essential
for multi-turn retrieval, often unnecessary for single-shot search. Measure
recall with and without before making it permanent.

## ReAct Pattern

*reason and act*

The model states why it is calling a tool, calls it, then reasons about what came
back. The value is not that the model performs better — it is that the run
becomes legible.

Without the reasoning steps, a failed run is a list of tool calls and you infer
intent from arguments. With them, *"I need the customer's order history, so I
will search by email"* followed by an empty result tells you the agent had the
wrong lookup key. Not a broken tool, not a confused model: one wrong assumption,
in one line.

**The stated plan is a second thing to score.** Judge it separately from the
outcome and "good plan, broken tool" stops looking identical to "the tools
worked and the plan was wrong". One is an engineering bug; the other is a prompt
or a model choice.
