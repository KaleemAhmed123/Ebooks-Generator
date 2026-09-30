## Streaming tool calls

- **Streaming** sends the response token by token as it is generated, so a UI can show text appearing live instead of waiting for the whole reply. Tool calls stream too — but they need care, because a half-streamed tool call is not yet safe to run.
- As a tool call streams, the `input` JSON arrives in **fragments**: `{"ci` … `ty": "Pa` … `ris"}`. You must **accumulate the fragments and wait for the block to complete** before parsing the arguments and executing. Running on a partial JSON is a bug waiting to happen.

<svg viewBox="0 0 360 96" role="img" aria-label="Tool argument JSON arrives in fragments and must be fully assembled before executing" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <g font-size="6"><rect x="10" y="24" width="46" height="18" rx="2" fill="#f4f4f4" stroke="#888"/><text x="33" y="36" text-anchor="middle">{"ci</text>
  <rect x="60" y="24" width="46" height="18" rx="2" fill="#f4f4f4" stroke="#888"/><text x="83" y="36" text-anchor="middle">ty":"Pa</text>
  <rect x="110" y="24" width="46" height="18" rx="2" fill="#f4f4f4" stroke="#888"/><text x="133" y="36" text-anchor="middle">ris"}</text></g>
  <text x="180" y="37" font-size="7">→ accumulate →</text>
  <rect x="250" y="22" width="100" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="300" y="36" text-anchor="middle" font-size="6">complete → parse → run</text>
  <rect x="10" y="60" width="146" height="20" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="83" y="73" text-anchor="middle" font-size="6">running on a fragment = crash</text>
</svg>

- **What streaming buys you:** responsiveness. You can show *"calling get_weather…"* the instant the tool name arrives, keeping the user informed during a long agent run, and you can stream the model's final text answer as it writes it.
- **What it does not change:** the round trip. You still assemble the full tool call, run it, and feed the result back. Streaming is a UX layer over the same mechanism, not a different one.
- **Timing subtlety:** the tool name usually streams *before* its arguments finish. Show progress on the name; execute only on completion.

:::warn
The subtle streaming bug is executing too early. It is tempting to parse `input` as soon as it "looks like" valid JSON, but a fragment can be momentarily parseable and still incomplete (`{"city":"Pa"}` before `"ris"` arrives). Wait for the provider's explicit "block complete" / "message stop" event before you run anything. Treat a streaming tool call as pending until the API says it is done.
:::
