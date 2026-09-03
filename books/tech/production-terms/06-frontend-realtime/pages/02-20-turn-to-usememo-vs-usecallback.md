## TURN

A relay server used when a direct peer connection is impossible. It carries all
the media, which means it costs real bandwidth money.

Symmetric NAT on a corporate network blocks a direct connection, so TURN relays
the stream. It works, and you are now paying for every megabyte of that call.

**Roughly ten to twenty percent of calls need it**, which makes it a line item
rather than an edge case. Budget the bandwidth before launch, because the
proportion does not fall as you grow — it is a property of your users' networks,
not your architecture.

Skipping TURN entirely means those calls simply fail, on exactly the corporate
networks your enterprise customers use.

## useMemo vs useCallback

`useMemo` caches a computed value. `useCallback` caches a function reference.
Both cost memory and comparison work, so both need a real problem to justify
them.

Memoising `a + b` is slower than recomputing it. Memoising a 30ms filter over
ten thousand rows is not.

They are the same tool — `useCallback(fn, deps)` is `useMemo(() => fn, deps)`.

**Two cases earn it:** the computation is genuinely expensive, or the value is
passed as a prop or dependency to something memoised, where a new reference each
render defeats the memo you already added.

Everything else is cost with no return, and it makes the dependency arrays
someone has to maintain.
