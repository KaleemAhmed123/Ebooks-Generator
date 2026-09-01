### 2. Specificity Weights

When rules compete, the browser calculates a specificity weight based on the selectors used. The weight is calculated in three columns: `(ID, Class, Element)`.

- **Inline styles**: Win against all external CSS (effectively 1,0,0,0).
- **ID selectors (`#header`)**: Extremely high specificity (1,0,0).
- **Class, pseudo-class, and attribute selectors (`.btn`, `:hover`, `[type="text"]`)**: Medium specificity (0,1,0).
- **Element and pseudo-element selectors (`div`, `::before`)**: Low specificity (0,0,1).
- **Universal selector (`*`) and combinators (`+`, `>`, `~`)**: No effect on specificity (0,0,0).

#### The Specificity Wars
Specificity is not a base-10 system. 11 classes do *not* override 1 ID. An ID will always beat any number of classes.

```css
#nav-menu a { color: blue; } /* Specificity: 1, 0, 1 */
.nav .menu .item .link { color: red; } /* Specificity: 0, 4, 0. Blue wins. */
```

This is why modern CSS methodologies (like BEM or Tailwind) strictly avoid ID selectors and deep nesting. Deep nesting creates highly specific rules that are impossible to override later without using even more specific rules or `!important`.

### 3. The `!important` Exception

`!important` breaks the cascade. It forces a rule to the top of the priority list, regardless of specificity. 

**When to use `!important`:** Almost never. It is an act of desperation. The only valid use case is in utility classes (like Tailwind does) where you absolutely guarantee that if a developer explicitly adds a `.hidden` class, it *must* hide the element, overriding any component-level display rules.

### Managing Scope: CSS Modules and BEM

Because CSS is globally scoped by default, class name collisions are inevitable in large codebases. 
Historically, we solved this with naming conventions like **BEM (Block Element Modifier)**:
`.card__title--active`

Today, bundlers solve this automatically using **CSS Modules**. You write standard CSS classes, and during the build step, the bundler generates unique hashes for the class names (e.g., `.title_x3f9q`), guaranteeing zero global collisions.
