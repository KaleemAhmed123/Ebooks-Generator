### Which primitives sit underneath

`cva` and `tailwind-merge` handle the styling. They do not handle the behavior:
focus trapping, arrow-key navigation, `aria-expanded`, dismissing on Escape,
returning focus to the trigger. Writing that yourself for a dozen components is
where design systems go to die.

**Headless primitives** ship the behavior and none of the styling, which is
exactly the split you want.

| Library | Notes |
|---|---|
| **Radix UI** | the long-standing default, React only, deeply accessible |
| **Base UI** | from the Material UI and Radix teams, the newer option |
| **Ark UI** | React, Vue, Solid and Svelte from one codebase |
| **React Aria** | Adobe's, the most rigorous accessibility work in the category |

**shadcn/ui**, which crossed 75,000 GitHub stars, supports **both Radix and Base
UI** primitives under the same component API. That is worth understanding
because it explains the model: shadcn is not a dependency you install, it is
code you copy into your repository. You own the file, you can edit it, and there
is no library upgrade that changes your button.

Ark UI is the one to look at if you have more than one framework in the
building. One set of tokens and one set of component specifications, deployed to
React and Vue, is a genuinely hard problem that it solves.
