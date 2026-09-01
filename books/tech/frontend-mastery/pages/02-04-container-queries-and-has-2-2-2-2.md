### What it costs

`:has()` makes the browser re-evaluate a parent whenever a descendant changes. Modern engines optimize the common cases well, but a rule like `div:has(*)` asks the browser to check every element on every mutation. Keep the subject specific and the inner selector narrow.

### Where these land

Both are Baseline and safe to use in production. Between them they remove most of the reasons a component reached for JavaScript to make a layout decision, and that matters beyond tidiness: CSS runs before hydration. A layout expressed in CSS is correct in the very first painted frame. A layout expressed in a React state variable is correct only after the bundle has downloaded, parsed, and hydrated.
