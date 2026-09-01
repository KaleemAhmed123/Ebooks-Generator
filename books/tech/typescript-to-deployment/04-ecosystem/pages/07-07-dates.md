## Dates and time

- JavaScript's `Date` has been broken since 1995 and every date library exists because of it
- Months are zero indexed, so December is 11, and this has caused more off-by-one bugs than any other API
- It is **mutable**, so `date.setDate()` changes the object every other reference is holding
- It has no concept of a time zone beyond the machine's own, so a server in UTC and a user in Kolkata disagree about what day it is
- A **date library** replaces it with immutable values, honest time zone handling and readable arithmetic
- `date-fns` is a collection of standalone functions, so a bundler drops the ones you never call
- `dayjs` mirrors the old moment API in about two kilobytes, which makes it the easy migration from legacy code
- **Temporal** is the language's own replacement, enabled by default in Node 26, and it makes both of them optional over time

```ts
import { addDays, differenceInHours, formatISO } from "date-fns"

const dispatchBy = addDays(new Date(order.paidAt), 2)
differenceInHours(dispatchBy, new Date())   // 41
```

- **Store UTC, always.** Convert to a time zone only when displaying
- Store the time zone alongside anything a user scheduled, because "9am every Monday" changes absolute time when the clocks shift
- A date with no time is a different type from a moment in time, and treating them the same is where recurring events break
