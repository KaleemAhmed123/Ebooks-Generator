### Three smaller changes worth knowing

**`ref` is now an ordinary prop.** `forwardRef` is no longer necessary, and
will be deprecated in a future release.

```jsx
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}
```

**A context is its own provider.** `<ThemeContext.Provider value="dark">` becomes `<ThemeContext value="dark">`.

**Metadata tags hoist themselves.** Render `<title>`, `<meta>`, or `<link>` anywhere in the tree and React moves them into the document head. No more `react-helmet` for the common case.

```jsx
function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.summary} />
      <h1>{post.title}</h1>
    </article>
  );
}
```
