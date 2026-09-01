### The Button vs. Div Debate

One of the most common accessibility failures is creating a clickable element using a `<div>` or a `<span>`.

```html
<!-- BAD: DO NOT DO THIS -->
<div class="btn" onclick="submitForm()">Submit</div>
```

If you do this, you lose:
1. **Keyboard Accessibility**: Users cannot focus the element using the `Tab` key.
2. **Key Events**: Users cannot trigger the click using the `Enter` or `Space` keys.
3. **Semantic Meaning**: Screen readers announce it as "group", not "button".

To fix the `<div>`, you would have to reinvent the wheel:

```html
<!-- TERRIBLE: Recreating native functionality -->
<div 
  class="btn" 
  role="button" 
  tabindex="0" 
  onclick="submitForm()" 
  onkeydown="if(event.key === 'Enter' || event.key === ' ') submitForm()"
>
  Submit
</div>
```

Or, you could just use the native element:

```html
<!-- GOOD -->
<button class="btn" onclick="submitForm()">Submit</button>
```

**Rule of Thumb:** If it triggers an action on the page, use a `<button>`. If it navigates to a new URL, use an `<a>`.
