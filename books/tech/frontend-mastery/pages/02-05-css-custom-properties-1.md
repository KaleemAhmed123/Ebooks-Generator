## CSS Custom Properties (Variables)

For years, frontend developers relied on CSS preprocessors like Sass and LESS to provide variables. We would define `$primary-color: #007bff;` and use it throughout our `.scss` files. 

However, Sass variables are **build-time** variables. When the Sass compiles to CSS, the variable is replaced by the static hex value. The browser never knows the variable existed.

**CSS Custom Properties** (`--variable-name`) are native, **run-time** variables. They exist in the DOM, they inherit like standard CSS properties, and they can be updated dynamically via JavaScript. This fundamentally changes how we architect CSS.

### Declaration and Usage

Custom properties are usually declared on the `:root` pseudo-class (which represents the `<html>` element) so they are globally accessible.

```css
:root {
  --primary: #2563eb;
  --surface: #ffffff;
  --spacing-md: 16px;
}

.button {
  background-color: var(--primary);
  padding: var(--spacing-md);
}
```
