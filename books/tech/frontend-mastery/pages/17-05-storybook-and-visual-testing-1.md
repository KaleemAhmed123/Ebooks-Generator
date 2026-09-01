## Storybook and Visual Testing

Unit tests check logic. Integration tests check behavior. Neither one looks at
the page. A component can pass every assertion in the suite and still render
with white text on a white background.

**Storybook** is the workbench for that gap. It renders each component in
isolation, in every state, outside the application, so you can look at all of
them at once without clicking through the app to reach each one.

### Why it earns its place

Three reasons, and only the first is the obvious one.

**Development.** Building an error state normally means finding a way to make the
API fail. In Storybook the error state is a story you open directly.

**Documentation.** A design system that lives only in code is a design system
nobody outside the team can use. A running Storybook is the reference designers,
product and QA actually open.

**The states nobody remembers.** Loading, empty, error, one item, two hundred
items, a name that is forty characters long, right-to-left. Writing them as
stories makes forgetting one visible.
