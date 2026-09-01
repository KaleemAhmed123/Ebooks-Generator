## The DOM and BOM

JavaScript in the browser environment interacts primarily with two massive, object-oriented APIs: the **DOM (Document Object Model)** and the **BOM (Browser Object Model)**.

### The BOM (Browser Object Model)

The BOM represents the browser window itself. It is the environment in which the DOM resides. The root object of the BOM is the `window` object.

When you declare a global variable using `var` in the browser, it attaches to the `window` object. (This is one of the many reasons we use `let` and `const`).

Key BOM APIs include:
- `window.navigator`: Information about the user's browser, OS, and capabilities (e.g., `navigator.userAgent`, `navigator.clipboard`).
- `window.location`: Reads and manipulates the current URL. Assigning to `window.location.href` triggers a hard navigation.
- `window.history`: Allows manipulation of the browser session history (`history.pushState()`, `history.back()`). This is the foundation of client-side routing in SPAs.
- `window.screen`: Information about the user's physical display (width, height, color depth).

The BOM also provides global functions like `setTimeout()`, `setInterval()`, and `fetch()`.
