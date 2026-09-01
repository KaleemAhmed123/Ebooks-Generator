## React Testing Library (RTL)

For many years, the standard way to test React components was a library called Enzyme. 
Enzyme allowed developers to dig deep into a component's internals. You could write a test that said: *"Assert that this component's internal `count` state is 1."*

This turned out to be a massive mistake. If a developer refactored the component to use `useReducer` instead of `useState`, the UI would look exactly the same to the user, but the test would instantly fail because the internal architecture changed. Tests became a liability rather than a safety net.

### The RTL Philosophy

**React Testing Library (RTL)** was created by Kent C. Dodds with one fundamental guiding principle:
> "The more your tests resemble the way your software is used, the more confidence they can give you."

RTL forces you to test your components exactly like a human user would interact with them. 
A human user doesn't know what `useState` is. A human user looks at the screen, finds a button that says "Submit", clicks it, and expects a success message to appear on the screen.
