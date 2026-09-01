### Keys, not English

Use structured keys rather than English sentences as keys.

```json
{
  "cart.empty.title": "Your cart is empty",
  "cart.empty.action": "Browse products",
  "cart.itemCount": "{count, plural, one {# item} other {# items}}"
}
```

English-as-key looks convenient until a copy edit changes the punctuation and every translation silently falls back to English. A stable key survives copy changes, and the ICU message syntax in the third line keeps the plural logic with the translator who understands the language, rather than in your component.
