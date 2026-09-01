# Module 2: Modern CSS

## The Cascade and Specificity

CSS stands for **Cascading Style Sheets**. The "Cascade" is the foundational algorithm that dictates how browsers resolve conflicting CSS rules. Failing to understand the cascade leads to the most common CSS anti-pattern: throwing `!important` at a rule until it works.

To master CSS, you must understand the rules of engagement.

### 1. Source Order

If two rules have the exact same specificity and target the exact same element, the one declared *last* in the stylesheet wins. This is the simplest level of the cascade.

```css
.btn { background: blue; }
.btn { background: red; } /* Red wins */
```
