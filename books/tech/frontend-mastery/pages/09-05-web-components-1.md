## Web Components

Every pattern in this module is a React pattern. Web Components are the
platform's own answer to the same problem, and they outlive frameworks, which is
the entire reason to know them.

A component library written in React works in React. The same library written as
custom elements works in React, Vue, Svelte, Angular, a Rails template, and a
plain HTML file, from one codebase.

### The three pieces

**Custom Elements** let you define a new HTML tag with its own behavior.

```js
class UserCard extends HTMLElement {
  static observedAttributes = ['name', 'role'];

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    this.innerHTML = `
      <h3>${this.getAttribute('name')}</h3>
      <p>${this.getAttribute('role')}</p>`;
  }
}
customElements.define('user-card', UserCard);
```

```html
<user-card name="Sam Rivera" role="Editor"></user-card>
```

The tag name must contain a hyphen. That is the specification reserving
single-word tags for itself forever, so your element can never collide with a
future HTML element.

**Shadow DOM** gives the element its own isolated tree. Styles inside cannot
