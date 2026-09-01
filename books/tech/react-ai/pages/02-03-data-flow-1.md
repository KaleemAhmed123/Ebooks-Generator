## Data flow patterns

- Data flows in one direction in React: from parent to child through props
- This is not a limitation — it is what makes a component tree predictable
- When you need data to flow from a child to a parent, you pass a callback down
- When you need data to be shared across siblings, you lift the state to the common ancestor

### Lifting state: when and how far

- Lift state only as high as the lowest common ancestor that needs it
- Lifting to the root because it seems easier is prop drilling in disguise — you are just hiding the depth
- A sign that you have lifted too high: a component renders on every keystroke in a search input ten levels above it

### Prop drilling and when it actually matters

- Prop drilling is passing props through components that do not use them, only to reach a component that does
- It is a real problem when: the chain is more than three levels, or the intermediate components need to be tested without the prop
- The fix is not always context. Consider co-location first

```
❌ Drilling through layout shells

App → DashboardLayout → MainContent → Sidebar → UserAvatar

✅ Co-locate: render UserAvatar where it belongs

App → Header → UserAvatar (direct)
```
