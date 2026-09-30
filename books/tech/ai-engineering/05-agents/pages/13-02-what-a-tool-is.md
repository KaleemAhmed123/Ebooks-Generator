## What a tool is: the interface

- A tool, to the model, is not code. It is a **description** — a name, a sentence of purpose, and a schema of parameters. The model never sees your implementation; it sees the label on the button and decides whether to press it.

:::mint
```json
{
  "name": "get_weather",
  "description": "Get the current weather for a city. Use when the user asks about weather.",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": { "type": "string", "description": "City name, e.g. 'Paris'" },
      "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] }
    },
    "required": ["city"]
  }
}
```
:::

- Three parts, each doing a job:
  - **name** — the identifier the model emits to call it.
  - **description** — natural language telling the model *what it does and when to use it*. This is the single most important field; the model chooses tools by reading it.
  - **input_schema** — JSON Schema (a standard for describing the shape of JSON data) defining the arguments, their types, which are required, and their allowed values.
- The schema is a **contract in both directions**: it tells the model how to call the tool, and it lets your code validate what comes back before running anything.

:::note
Because the model only ever reads the description and schema, **tool design is prompt engineering**. A perfectly working function with a vague description is a tool the model calls at the wrong time or not at all. You are writing not for a programmer who reads docs, but for a model that decides in one shot from a sentence.
:::
