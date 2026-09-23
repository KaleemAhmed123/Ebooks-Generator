### The element call

`_jsx` takes two arguments:
1. **The Type:** A string for native HTML tags (like `'div'` or `'h1'`), or a reference to another React Component function.
2. **The Props:** An object containing every attribute — `className`, `id`, `onClick` — and whatever goes inside the element, under the key `children`.

The classic `React.createElement` took children as a *third positional argument* instead of a prop. Same element, different call shape. That is the one difference worth remembering when you read older code or older articles.

### Why this matters

Understanding that JSX compiles down to a function call explains several fundamental React rules:

1. **Why must a component return a single parent element?**
   Because a JavaScript function can only return one value. You cannot return two `_jsx` calls side-by-side without wrapping them in an array or a Fragment (`<>...</>`).

2. **Why do we use `className` instead of `class`?**
   Because `class` is a reserved keyword in JavaScript. Since the JSX is ultimately transformed into a JavaScript object, using `class` would cause syntax conflicts in older engines.

3. **Why can we use JavaScript inside JSX curly braces `{}`?**
   Because the JSX is literally just building a JavaScript object. When you write `<p>{user.name}</p>`, you are passing `user.name` as the `children` prop of that object.
