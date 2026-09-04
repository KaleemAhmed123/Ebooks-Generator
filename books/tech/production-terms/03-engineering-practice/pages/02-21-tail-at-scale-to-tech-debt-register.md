## Tail-at-Scale

Dean and Barroso, *Communications of the ACM*, February 2013. Take a server that
usually answers in 10ms but has a 99th-percentile latency of one second: one
request in 100 is slow. Fan a single user request out to 100 such servers in
parallel and 63% of user requests take more than one second.

<svg viewBox="0 0 460 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One user request fans out in parallel to a hundred servers; because each server has a 99th-percentile latency of one second, 63 percent of user requests take more than one second">
  <rect x="4" y="34" width="78" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="13" y="47.5" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">1 request</text>
  <path d="M84 44 L148 9 M84 44 L148 21 M84 44 L148 45 M84 44 L148 57 M84 44 L148 69 M84 44 L148 81" stroke="#6b6b6b" stroke-width="0.9"/>
  <path d="M84 44 L148 33" stroke="#0d7a7a" stroke-width="1.3"/>
  <rect x="150" y="4" width="54" height="10" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="150" y="16" width="54" height="10" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="150" y="28" width="54" height="10" fill="#e2fcf3" stroke="#0d7a7a" stroke-width="1.4"/>
  <rect x="150" y="40" width="54" height="10" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="150" y="52" width="54" height="10" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="150" y="64" width="54" height="10" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="150" y="76" width="54" height="10" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <path d="M208 44 H230" stroke="#1a1a1a" stroke-width="1.2"/><path d="M230 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="238" y="22" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">each server: 10ms typical, p99 = 1s</text>
  <text x="238" y="41" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">100 of them, in parallel</text>
  <text x="238" y="60" font-family="Georgia,serif" font-size="10" fill="#0d7a7a">63% of requests exceed 1s</text>
</svg>

**Optimising the median buys nothing here.** Cut the fan-out, or hedge: send a
second copy to another replica and take whichever answers first. In Google's own
measured service, the root p99 for a single random request is 10ms; for all of
them to finish, 140ms.

## Tech Debt Register

A tracked list of deliberate compromises, each with the cost it imposes and what
would repay it. Cunningham's metaphor is narrower than the phrase's current use:
"Shipping first time code is like going into debt. A little debt speeds
development so long as it is paid back promptly with a rewrite."

**An entry with no interest recorded is a complaint, not debt.** Write down what
the shortcut costs each week — the extra manual deploy step, the reconciliation
someone runs by hand — or the item will lose to every feature, forever, on the
grounds that nobody can say what it is costing.
