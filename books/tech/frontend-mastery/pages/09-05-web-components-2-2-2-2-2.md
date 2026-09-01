### When to reach for them

**Yes:**

- One design system, several frameworks or several teams on different stacks.
- An embeddable widget that has to run on a customer's page without knowing what
  is on it. The shadow boundary means their CSS cannot break you and yours
  cannot break them.
- A component with a very long life that must outlast the current framework.

**No:**

- A single React application. React components are simpler, compose better, and
  the server rendering works.
- Anything performance-critical and server-rendered.

**Worth knowing regardless**, because you already use them. `<details>`,
`<dialog>`, `<input type="range">` and the video player controls are all built
on shadow DOM. When DevTools shows you `#shadow-root (user-agent)` and your CSS
does nothing, this page is why.
