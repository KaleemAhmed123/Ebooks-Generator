## Parent-Child / Small-to-Big Retrieval

Chunk size is pulled two ways at once. Small chunks match precisely — one vector
carrying one focused idea gives a clean signal. Large chunks read better,
because they carry the heading and the definitions that make "the rate" refer to
something.

Small-to-big refuses the trade-off. Embed and search over small chunks; when one
matches, return its parent section to the model instead. The only cost is
storing the relationship and one extra lookup.

<svg viewBox="0 0 460 66" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A small child chunk is matched by the search, and its larger parent section is what gets sent to the model">
  <rect x="4" y="10" width="150" height="42" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="79" y="24" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">parent section</text>
  <rect x="16" y="30" width="60" height="14" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.2"/>
  <text x="46" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">child</text>
  <text x="176" y="24" font-family="Georgia,serif" font-size="9.5" fill="#c25a35">search matches the child — precise</text>
  <text x="176" y="42" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">the parent is what the model reads</text>
</svg>

It earns most on structured documents — contracts, policies, manuals — where a
clause is meaningless outside its section.

**Watch the total context.** A few expanded parents fill a window fast, so cap
how many you expand. Expanding all ten matches turns a precision technique back
into the context-stuffing it was meant to avoid.

## PII Redaction Pipeline

*personally identifiable information*

Detecting and removing personal data before it reaches a model, a log, or a
training set. Anything sent to a provider may be retained under their policy;
anything in your own traces falls under your retention rules — usually the least
governed data a team holds.

Detection needs both approaches, because each misses what the other catches:
regular expressions for structured formats — card numbers, emails, national IDs
— and named entity recognition for names, addresses and organisations. Tune for
recall over precision: over-redacting degrades an answer, under-redacting is a
compliance incident. Where the real value is needed in the response, tokenise:
substitute a placeholder, put the value back after generation.

**Redact every path, not the prompt path.** A carefully redacted prompt is
undone by an evaluation set built from raw production requests — typically built
by someone who never saw the redaction work.
