## Developer Environment

- A developer is only as fast as their tools. Writing code in a plain text editor is a surefire way to slow down your progress and introduce typos
- **VSCode** is the industry standard. However, installing the right extensions is critical
- Must-have extensions:
  - **Prettier:** Formats your code automatically on save. Never argue about spaces vs tabs again
  - **ESLint:** Catches syntax errors and dangerous anti-patterns before you even run the code
  - **GitLens:** Shows you exactly who wrote a specific line of code and when they wrote it

## Chrome DevTools Mastery

- The browser is your debugger. `console.log()` is useful, but it is not enough
- **The Elements Tab:** Do not guess CSS values in your code. Inspect the element, tweak the CSS directly in the browser, and copy it back to your code once it looks perfect
- **The Network Tab:** If data is missing from the UI, always check the Network tab first. Look at the API request. Did it return a 404? Did it return data in a different shape than you expected? 
  - *Pro-tip:* You can throttle your network speed to "Slow 3G" here to see how your loading spinners perform for users on poor connections
- **The Performance Tab:** Use this to record a trace of your app. If a button click takes 500ms, the trace will show you exactly which React components took the longest to render

## UI & Design Assets

- You do not need to be a designer to build beautiful applications. Rely on standardized open-source tools
- **Icons:** Use `lucide-react` or `heroicons`. They are SVG-based, accessible, and easily styled with Tailwind
- **Illustrations:** Use `undraw.co` for free, customizable SVG illustrations
- **Colors:** Use Tailwind's default color palette. It has been mathematically balanced by professional designers. Do not try to invent your own shade of blue
