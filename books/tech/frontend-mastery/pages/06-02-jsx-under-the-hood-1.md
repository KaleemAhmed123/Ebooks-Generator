## JSX Under the Hood

When React was first announced, developers hated JSX. The idea of writing HTML directly inside JavaScript files felt like a massive violation of the "Separation of Concerns" principle. We had spent a decade keeping our `.html` files separate from our `.js` files!

But React challenged this assumption. It argued that UI structure (HTML) and UI logic (JavaScript) are inherently coupled. Separating them into different files doesn't separate concerns; it just separates technologies. By bringing them together into a Single File Component, you create a highly cohesive module.

### JSX is just Syntactic Sugar

The browser has absolutely no idea what JSX is. If you try to run `<div />` in the Chrome console, it will throw a Syntax Error. 

Before your code hits the browser, a transpiler (like Babel or SWC) scans your files and converts every single piece of JSX into a standard JavaScript function call: `React.createElement()`.

```jsx
// What you write in your IDE:
const MyButton = () => {
  return (
    <button className="primary" onClick={handleClick}>
      Click Me
    </button>
  );
};
```

```javascript
// What the transpiler turns it into before sending it to the browser:
const MyButton = () => {
  return React.createElement(
    'button',
    { className: 'primary', onClick: handleClick },
    'Click Me'
  );
};
```
