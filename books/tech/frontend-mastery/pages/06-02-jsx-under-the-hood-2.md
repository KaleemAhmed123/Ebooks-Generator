### The `React.createElement` API

The `createElement` function takes three arguments:
1. **The Type:** A string for native HTML tags (like `'div'` or `'h1'`), or a reference to another React Component function.
2. **The Props:** An object containing all the attributes (like `className` or `id`).
3. **The Children:** Whatever goes inside the element. This can be text, or an array of more `createElement` calls!

### Why this matters

Understanding that JSX compiles down to `React.createElement` explains several fundamental React rules:

1. **Why must a component return a single parent element?**
   Because a JavaScript function can only return one value. You cannot return two `React.createElement` calls side-by-side without wrapping them in an array or a Fragment (`<>...</>`).

2. **Why do we use `className` instead of `class`?**
   Because `class` is a reserved keyword in JavaScript. Since the JSX is ultimately transformed into a JavaScript object, using `class` would cause syntax conflicts in older engines.

3. **Why can we use JavaScript inside JSX curly braces `{}`?**
   Because the JSX is literally just building a JavaScript object! When you write `<p>{user.name}</p>`, you are just passing `user.name` as the third argument to the `createElement` function.
