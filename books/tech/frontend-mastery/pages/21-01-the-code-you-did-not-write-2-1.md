### The pattern changed, and this is the part that matters

The old attack was a **typosquat**. You typed `reqeusts` instead of `requests`
and installed something a stranger wrote. Reading your dependency list carefully
defended against it.

The 2026 attacks are not that. In every case above, the attacker took over a
**real maintainer's account** and shipped malicious code through an **official
release of a package you already trusted and already had in your lockfile**.

Which means:

- Reviewing your dependency list does not help. The name was correct.
- A lockfile does not help by itself. It pins a version, and the poison arrived
  as a new version you later upgraded to.
- Package popularity does not help. `axios` is one of the most downloaded
  packages in the ecosystem. That is precisely why it was targeted.
- Your own code review does not help. Nobody reads the diff of a transitive
  dependency four levels down.

### Why the frontend is a good target

A compromised backend dependency runs on your servers, where you have logs, a
runtime you control, and an egress firewall.

A compromised frontend dependency runs **in your users' browsers**, on machines
you do not own, where you have none of that. It can read the login form as the
user types. It can read a token from `localStorage`. It can post both to any
domain, and unless you set a Content Security Policy with a `connect-src`, the
browser will happily let it.

The most valuable thing your application handles often passes through the
browser first. That makes the frontend build the most attractive place in your
stack to hide.
