## Function Calling / Tool Use

*tool use*

The model emits a structured request naming a tool and its arguments; your code
executes it and hands the result back. In Claude's Messages API the response
carries `stop_reason: "tool_use"` and a `tool_use` block, and you reply with a
`tool_result` block quoting the same `tool_use_id`.

The model never executes anything, and every safety property follows from that
split. The arguments are untrusted input — anyone whose text reaches the context
can influence them — so validate against the schema and run the tool with the end
user's permissions, never with broad service credentials.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The model returns a tool_use block, your code executes the tool and returns a tool_result block, and the model then answers; execution never happens inside the model">
  <rect x="4" y="14" width="86" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="47" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">model</text>
  <path d="M90 27 H144" stroke="#1a1a1a" stroke-width="1.2"/><path d="M144 27 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="94" y="22" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">tool_use</text>
  <rect x="146" y="14" width="122" height="26" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="207" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">your code executes</text>
  <path d="M268 27 H322" stroke="#1a1a1a" stroke-width="1.2"/><path d="M322 27 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="272" y="22" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">tool_result</text>
  <rect x="324" y="14" width="104" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="376" y="30" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">model answers</text>
  <text x="4" y="62" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">everything crossing the accent box is untrusted — validate it, then run as the end user</text>
</svg>

**Tool definitions are billed on every single request.** The `tools` parameter is
input tokens, and enabling tools adds a system prompt of its own: 286 tokens on
Claude Opus 5 under `tool_choice: auto`, 406 under `any`. Twenty unused tools are
a bill you pay per call.

## Ground Truth Set

Documents where a person has recorded the correct value for every field, held
aside and compared against. Without one, "the extraction is good" is an opinion
with no way to settle it.

Measure per field, never in aggregate. One overall accuracy number averages the
fields that work with the ones that do not and hides which is which. Broken out,
the picture is usually lopsided — invoice number near perfect, supplier address
poor — so effort goes where the number is bad, not where it feels bad.

**Sample it to match production, not convenience.** If a fifth of real input is
photographs taken on a phone in bad light, a fifth of the set has to be too. A
set built from clean digital PDFs will report excellent accuracy and predict
nothing about the documents your users actually send.
