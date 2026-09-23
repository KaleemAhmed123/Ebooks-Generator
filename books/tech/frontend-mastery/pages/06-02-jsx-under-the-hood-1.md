## JSX Under the Hood

When React was first announced, developers hated JSX. The idea of writing HTML directly inside JavaScript files felt like a massive violation of the "Separation of Concerns" principle.

But React challenged this assumption. It argued that UI structure (HTML) and UI logic (JavaScript) are inherently coupled. Separating them into different files doesn't separate concerns; it just separates technologies. By bringing them together into a Single File Component, you create a highly cohesive module.

### JSX is just Syntactic Sugar

The browser has absolutely no idea what JSX is. If you try to run `<div />` in the Chrome console, it will throw a Syntax Error. 

Before your code hits the browser, a transpiler (Babel, SWC or esbuild) rewrites every piece of JSX into a plain function call. Since React 17 the default is the **automatic runtime**: the compiler inserts an import of `jsx` from `react/jsx-runtime` and calls that. You never import it, and you no longer need to import React just to use JSX.

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
import { jsx as _jsx } from 'react/jsx-runtime';

const MyButton = () => {
  return _jsx('button', {
    className: 'primary',
    onClick: handleClick,
    children: 'Click Me'
  });
};
```

The older **classic transform** emitted `React.createElement('button', { … }, 'Click Me')` instead. It still works if a toolchain is configured for it, and it is why every file used to begin with `import React from 'react'`.
