## Self-Consistency

Sampling several independent reasoning paths at non-zero temperature, then
taking the majority answer. Errors scatter; correct answers converge, because
there are many ways to reason wrongly and few ways to reason right.

Wang et al. (ICLR 2023) measured the gain over greedy chain-of-thought decoding:
+17.9% on GSM8K, +12.2% on AQuA, +11.0% on SVAMP, +6.4% on StrategyQA. Cost is
linear in samples — five samples is five times the tokens, and five times the
latency unless you run them in parallel.

<svg viewBox="0 0 460 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One prompt sampled five times produces three matching answers and two different ones; the majority is returned and the spread is recorded as an uncertainty signal">
  <rect x="4" y="26" width="76" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="42" y="45" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">prompt</text>
  <path d="M80 41 H108" stroke="#1a1a1a" stroke-width="1.2"/><path d="M108 41 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="112" y="6" width="52" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="138" y="19" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">42</text>
  <rect x="112" y="28" width="52" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="138" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">42</text>
  <rect x="112" y="50" width="52" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="138" y="63" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">42</text>
  <rect x="112" y="72" width="52" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><text x="138" y="84" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">17</text>
  <path d="M164 41 H196" stroke="#1a1a1a" stroke-width="1.2"/><path d="M196 41 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="198" y="26" width="90" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="243" y="45" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">majority: 42</text>
  <text x="300" y="35" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the vote gives the answer;</text>
  <text x="300" y="49" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the spread gives the confidence</text>
</svg>

**The disagreement is worth more than the vote.** Five samples producing five
answers is uncertainty that no confidence score reported — a signal to abstain,
not to present the plurality as if it were unanimous.

## Semantic Caching

Matching cache entries by embedding similarity rather than exact string, so
"what is ML?" and "explain machine learning" hit one stored answer. Exact-match
caching is close to useless on natural language, because nobody phrases a
question the same way twice.

Everything rests on the similarity threshold, and its two failure modes are not
symmetrical. Too high and near-identical questions miss; you paid for an
embedding and got nothing. Too low and distinct questions collide, which serves
a fluent, confident answer to a question nobody asked. Nothing about it looks
wrong.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An incoming query is embedded, compared to stored question vectors, and served from cache only if similarity clears the threshold, otherwise the model is called">
  <rect x="4" y="12" width="72" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="40" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">query</text>
  <path d="M76 26 H100" stroke="#1a1a1a" stroke-width="1.2"/><path d="M100 26 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="102" y="12" width="86" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="145" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">embed</text>
  <path d="M188 26 H212" stroke="#1a1a1a" stroke-width="1.2"/><path d="M212 26 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="214" y="12" width="104" height="28" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="266" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">sim &gt; threshold?</text>
  <path d="M318 20 H396" stroke="#1a1a1a" stroke-width="1.2"/><path d="M396 20 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="398" y="23" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">hit</text>
  <path d="M318 34 H396" stroke="#1a1a1a" stroke-width="1.2"/><path d="M396 34 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="398" y="37" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">call</text>
  <text x="4" y="66" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">one number decides between a saved call and a wrong answer</text>
</svg>

**Keep an allow-list of cacheable intents, never a deny-list.** Anything whose
answer depends on who is asking, or on now, must never be served this way. A
deny-list fails open, and open here means leaking.
