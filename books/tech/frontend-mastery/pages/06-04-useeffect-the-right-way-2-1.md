### The Anti-Pattern: Deriving State

The most common mistake is using `useEffect` to update a state variable based on a change to another state variable.

```jsx
// BAD: the anti-pattern: This triggers an unnecessary double-render!
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```
Why is this bad?
1. The user types a letter in the `firstName` input.
2. React updates `firstName` and re-renders the component.
3. After the render finishes, React notices `firstName` changed, so it runs the `useEffect`.
4. The `useEffect` calls `setFullName`, which immediately forces React to re-render the component *again*. 

You just forced the browser to do twice the work for a single keystroke.

**The Solution:** Derive data during render. If you can calculate a value from existing state or props, just do it as a standard variable!

```jsx
// GOOD: THE REACT WAY: No useEffect required.
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

// This recalculates naturally on every render.
const fullName = `${firstName} ${lastName}`; 
```
