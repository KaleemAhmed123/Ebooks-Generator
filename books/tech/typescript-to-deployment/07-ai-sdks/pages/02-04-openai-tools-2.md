## Tool calling - continued

input = input.concat(item, {
    type: "function_call_output",
    call_id: item.call_id,
    output: JSON.stringify(order),
  })
}

const second = await client.responses.create({ model: "gpt-5.5", input, tools })
console.log(second.output_text)
```

- `strict: true` makes the arguments conform to the schema exactly, which removes a whole class of parse failures
- **Validate the arguments anyway**, with Zod, before touching a database. The schema constrains shape, never intent
