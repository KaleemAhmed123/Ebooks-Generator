## Compound Components Pattern - continued

4. **Stitch it to the Namespace (Optional but clean):**
```jsx
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
```

### The Beautiful API
Now look at how clean and flexible the API is for the developer using it.

```jsx
<Accordion>
  <Accordion.Item index={0}>
    <Accordion.Header>Section One (I can put a bold subtitle here!)</Accordion.Header>
    <Accordion.Content>This is the secret content.</Accordion.Content>
  </Accordion.Item>

  <Accordion.Item index={1}>
    <Accordion.Header>Section Two</Accordion.Header>
    <Accordion.Content>Even more secrets.</Accordion.Content>
  </Accordion.Item>
</Accordion>
```
This pattern is heavily used by modern UI libraries like Headless UI and Radix UI.
