### StyleX

Meta's, and running at Facebook and Instagram scale, which is what it is
optimized for.

```tsx
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  button: { paddingInline: 16, paddingBlock: 8, backgroundColor: colors.primary },
  disabled: { opacity: 0.5 },
});

<button {...stylex.props(styles.button, isDisabled && styles.disabled)} />
```

Its distinctive property is **deterministic merging**. When two style objects
both set `backgroundColor`, the last one wins, predictably, regardless of CSS
source order or specificity. That is the problem `tailwind-merge` exists to
solve, handled by the compiler instead of by a runtime string parser.

### Choosing

| Situation | Reach for |
|---|---|
| New project, no strong constraint | **Tailwind.** It is where the ecosystem, the hiring pool, and the tooling are |
| Styling is not the main problem | **CSS Modules.** Boring, native, zero dependencies |
| You want types on every token, enforced | **vanilla-extract** |
| You want Tailwind's output with a typed API | **Panda CSS** |
| Very large codebase, many teams, style conflicts are a real cost | **StyleX** |
| An existing Emotion or styled-components app that works | **leave it.** Migrate when RSC forces the issue, not before |

### The one thing to take from this

The question is not "CSS-in-JS or not". It is **when do the styles get
computed**.

Build time means static CSS, cacheable, no work in the browser, and Server
Components work. Runtime means flexibility you almost never need, paid for on
every render by every user. That is the whole argument, and it is why Tailwind,
CSS Modules, vanilla-extract, Panda and StyleX all ended up on the same side of
it while looking nothing alike.
