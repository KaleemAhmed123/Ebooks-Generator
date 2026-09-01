### Using them from React

React 19 fixed the long-standing friction. Before it, React set everything as an
HTML attribute, so passing an object or a function to a custom element did not
work, and custom events needed a `ref` and a manual listener.

React 19 supports custom elements properly: it sets properties when the element
declares them and attributes otherwise.

```jsx
<user-card name="Sam" role="Editor" onuserSelect={handleSelect} />
```

Two rough edges remain. TypeScript needs the element declared in JSX:

```ts
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'user-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { name?: string; role?: string },
        HTMLElement>;
    }
  }
}
```

And custom elements do not render on the server. They need JavaScript to
upgrade, so a Server Component page shows the light DOM until hydration.
Declarative Shadow DOM addresses this, and it is worth knowing about before you
commit a server-rendered application to a custom-element design system.
