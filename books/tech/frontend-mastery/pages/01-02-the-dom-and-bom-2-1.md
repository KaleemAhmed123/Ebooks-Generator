### The DOM (Document Object Model)

The DOM is an object-oriented representation of the web page. It is an API that allows JavaScript to read and manipulate the HTML document.

Every HTML element is a Node in the DOM tree. The DOM provides a massive interface for traversing, modifying, adding, and deleting these nodes.

#### DOM Traversal
Modern DOM querying is done almost exclusively via CSS selectors:
- `document.querySelector('.class')`: Returns the first matching Element node.
- `document.querySelectorAll('div')`: Returns a static `NodeList` of all matching elements.

*Note on NodeLists vs. Arrays:* A `NodeList` is array-like, but it is not an Array. It has `.forEach()`, but lacks methods like `.map()` or `.filter()`. You can convert it using `Array.from()` or the spread operator `[...document.querySelectorAll('div')]`.

#### DOM Manipulation
Direct DOM manipulation is what React abstracts away for us, but you still need to know what React is doing under the hood.

```javascript
// 1. Create a node
const newDiv = document.createElement('div');

// 2. Modify properties
newDiv.textContent = 'Hello, World!';
newDiv.classList.add('greeting');
newDiv.style.color = 'blue';

// 3. Append to the DOM
document.body.appendChild(newDiv);
```
