## Synthetic Data Generation

Using a model to manufacture training or evaluation examples when real labelled
ones are scarce — a new feature, a rare edge case, a document type you have seen
twice.

It earns its place on coverage. A hundred variations of an edge case you
encountered once gives an evaluation set representation it could not otherwise
have.

The limit is structural: generated data reflects the generator. It uses the
phrasings that model produces, carries the errors it makes, and omits the
failures it does not know about. Real inputs are messier in exactly the ways
that matter — truncation, mixed languages, formatting nobody would think to
invent.

**Score the synthetic and real portions separately.** The gap between them is
the amount by which your headline number is optimistic, and a blended score
hides precisely that.

## System Prompt

The instruction block placed before the conversation, setting the role,
constraints and output rules that hold across every turn. In Anthropic's
Messages API it is a top-level `system` field rather than an entry in
`messages` — which is exactly why later turns cannot overwrite it.

Position drives cost as much as behaviour. Being the stable prefix of every
request makes it the natural thing to cache; anything volatile placed inside it
— a timestamp, the user's name, today's ticket count — invalidates that prefix
on every single call.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The system prompt sits as a stable cacheable prefix in front of the varying conversation turns, so anything volatile placed inside it destroys the cacheable prefix">
  <rect x="4" y="16" width="188" height="28" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="98" y="34" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">system — identical every call</text>
  <rect x="196" y="16" width="82" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="237" y="34" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">turn 1</text>
  <rect x="282" y="16" width="82" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="323" y="34" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">turn 2</text>
  <rect x="368" y="16" width="88" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="412" y="34" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">turn 3</text>
  <text x="4" y="62" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">put today's date in the shaded box and nothing after it can be cached</text>
</svg>

**System prompt instructions are weighted, not enforced.** Whatever a user or a
retrieved document contributes lands in the same context and competes with them.
Rules that must hold — tenant scoping, spend caps, redaction — belong in code
outside the model.
