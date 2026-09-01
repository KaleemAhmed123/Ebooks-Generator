## Grounding the answer

- Retrieval puts the right text in the prompt. It does not stop the model answering from memory, or blending the two
- **Grounding** is the instruction and structure that make the answer traceable to the retrieved text

```text
Answer using only the sources below. Every claim must cite a source id.
If the sources do not contain the answer, say so and do not guess.

<source id="1" doc="returns-policy" page="4">
Refunds are credited within 5 to 7 working days of pickup.
</source>
<source id="2" doc="shipping-faq" page="1">
Pickup is scheduled within 48 hours of an approved return.
</source>
```

```ts
const { object } = await generateObject({
  model: registry.languageModel("anthropic:chat"),
  schema: z.object({
    answer: z.string(),
    sourceIds: z.array(z.number()),
    answered: z.boolean(),
  }),
  prompt,
})
```
