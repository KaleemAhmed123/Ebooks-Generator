## Compound Components Pattern

When you build a highly complex UI component, like a Tabs component or an Accordion, passing every single piece of data down through props quickly becomes unmanageable.

```jsx
// BAD: The "Prop Drilling" Anti-Pattern
<Accordion 
  items={[{ title: "One", content: "Details" }, { title: "Two", content: "More" }]}
  defaultOpenIndex={0}
  onToggle={(id) => console.log(id)}
  headerClassName="text-bold"
  contentClassName="p-4 bg-gray-100"
  icon={<PlusIcon />}
/>
```
This is terrible to read, hard to style, and impossible to extend. If a designer asks you to add a subtitle to the header of *only* the second item, you have to completely rewrite the `items` array schema.

### The Compound Components Solution
Compound components are a pattern where two or more components work together to accomplish a single task. The most famous native example of this is `<select>` and `<option>`. 

In React, we can build our own Compound Components using React Context to implicitly share state between the parent and the children, without requiring the developer to pass any props.
