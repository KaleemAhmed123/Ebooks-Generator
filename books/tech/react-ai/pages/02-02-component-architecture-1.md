## Component architecture

- The most common mistake is designing components around the UI shape rather than the data shape
- A component that fetches, transforms, decides layout, and renders is four components that did not get written

### The three layers

```
┌─────────────────────────────────┐
│         Page / Route            │  owns data fetching
├─────────────────────────────────┤
│       Feature components        │  own business logic and state
├─────────────────────────────────┤
│        UI primitives            │  own visual rendering only
└─────────────────────────────────┘
```

- Page components coordinate. They call `useQuery`, decide loading and error states, and pass data down
- Feature components contain the interactive logic: form submission, selection, expansion
- UI primitives know nothing about the domain. `Button`, `Card`, `Badge` take props and render
