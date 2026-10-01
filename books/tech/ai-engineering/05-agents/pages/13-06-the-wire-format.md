## The wire format, field by field

- Here is the actual conversation on the wire for one tool call, Anthropic-style (OpenAI differs in field names, same shape). Reading it once demystifies every framework. **[VERIFY exact schema per provider/date]**

:::mint
```json
// 1. Assistant turn — the model asks (stop_reason: "tool_use")
{ "role": "assistant", "content": [
    { "type": "text", "text": "Let me check that." },
    { "type": "tool_use", "id": "toolu_01A",
      "name": "get_weather",
      "input": { "city": "Paris", "unit": "celsius" } } ] }

// 2. Your turn — you return the result, referencing the id
{ "role": "user", "content": [
    { "type": "tool_result", "tool_use_id": "toolu_01A",
      "content": "{\"temp\": 14, \"sky\": \"rain\"}" } ] }

// 3. Assistant turn — final answer, using the result
{ "role": "assistant", "content": [
    { "type": "text", "text": "It's 14°C and rainy in Paris." } ] }
```
:::

- **The `id` is the glue.** The `tool_use` block carries an `id`; your `tool_result` must echo it back as `tool_use_id`. With parallel calls (13-08) there are several ids in flight, and the model matches each result to its request by id.
- **The result is a string.** You serialize your function's return (usually JSON) into the `content` field. The model reads it as text — so make it readable and compact (13-11 on returning good results).
- **The whole history is resent.** Each step you send the *entire* growing conversation — original messages, the `tool_use`, the `tool_result` — back to the stateless model. That is why long agent runs get expensive: the transcript, tools and all, is re-billed every turn.

:::interview
"Walk me through what's actually sent when a model calls a tool."

The assistant message contains a `tool_use` block with a unique id, the tool name, and a JSON `input`. You execute it and send back a `tool_result` block echoing that id with the output as a string. You then call the model again with the full history appended, and it produces the final text. The id links request to result; the model runs nothing itself.
:::
