## Auditing generated code

- The danger of AI generation is speed. You can build ten components in ten minutes, but if you do not read them, you just generated technical debt at machine speed
- Every generated component needs a human audit before it is merged

### The audit checklist

1. **Did it invent an API?** Models will hallucinate props on third-party components or assume an API endpoint exists that does not
2. **Is it accessible?** Models often output `<div>` with an `onClick` instead of a `<button>`. This breaks keyboard navigation and screen readers
3. **Did it leave security holes?** Rendering `dangerouslySetInnerHTML` because you asked it to "show the HTML" is a cross-site scripting (XSS) vulnerability waiting to happen
4. **Did it forget the failure paths?** Add error boundaries and suspense fallbacks where the model left them out

### Prompting for better code

- Do not ask: "Build a data table"
- Ask: "Build a data table. Use Tailwind for styling. Fetch data using React Query from `/api/orders`. Ensure there is a skeleton loading state and an error boundary. Do not use local state for sorting; put the sort column in the URL parameters."
- A strict spec yields engineered code. A loose spec yields a toy

### Reviewing the DOM

- Inspect the generated DOM. If you see ten nested `<div>` tags doing the job of CSS Grid, rewrite it
- The model does not pay the runtime cost of deep trees; the user's browser does
