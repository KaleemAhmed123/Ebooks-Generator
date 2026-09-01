## Migrating a JavaScript codebase, one file at a time

- Do not rewrite the repo. Turn the checker on gradually

### Step 1 - let TypeScript see the JavaScript

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "strict": true,
    "noEmit": true
  }
}
```

- `allowJs` includes `.js` files in the project
- `checkJs: false` means they are not checked yet

### Step 2 - opt files in one at a time

```js
// @ts-check
```

- That comment at the top of a `.js` file turns checking on for that file only
- You get most of the benefit before renaming anything

### Step 3 - rename the leaves first

- Start with files that import nothing from your own code. Utils, constants, types
- Work upward toward the entry point
- A leaf file has no dependents, so a wrong type cannot cascade

### Step 4 - use `unknown`, never `any`

- When you hit something you cannot type yet, `unknown` forces a check at the use site
- `any` spreads silently and you will never find it again

### Step 5 - turn `checkJs` on, then delete `allowJs`

- When the error count hits zero, the migration is over
