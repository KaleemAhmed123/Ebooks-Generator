### Nobody writes them by hand

The raw API is verbose. **Lit** is the thin library almost everyone uses.

```js
import { LitElement, html, css } from 'lit';

class UserCard extends LitElement {
  static properties = { name: {}, role: {} };
  static styles = css`h3 { font-size: 1.1rem; margin: 0; }`;

  render() {
    return html`<h3>${this.name}</h3><p>${this.role}</p>`;
  }
}
customElements.define('user-card', UserCard);
```

Reactive properties, efficient re-rendering, scoped styles, roughly 5kB. Adobe
Spectrum, Shoelace and several large enterprise design systems are built on it.
