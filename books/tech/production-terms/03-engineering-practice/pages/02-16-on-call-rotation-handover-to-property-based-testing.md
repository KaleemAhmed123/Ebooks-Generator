## On-Call Rotation & Handover

Who carries the pager, and what crosses the boundary when it changes hands.
PagerDuty's guidance is that the outgoing engineer tells the next about issues
still unresolved and anything else of note; a verbal summary is enough.

The readiness checklist is concrete: laptop and connectivity with you,
environments configured, repository copies current, third-party credentials
live, and notification settings that bypass Do Not Disturb.

**An expired credential is discovered at 3am, not at handover.** The only check
worth running is whether the incoming on-call can reach production right now —
and it is the check nobody runs, because the outgoing one still could.

## Property-Based Testing

Instead of asserting on one example, state a property that must hold for every
input — reversing a list twice returns the list — and let the runner generate
hundreds of cases trying to break it.

The generator is not the selling point. The shrinker is: given a 400-element
input that fails, Hypothesis and fast-check reduce it to the smallest input that
still fails.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A large failing input is repeatedly reduced by the shrinker until only the smallest input that still reproduces the failure remains">
  <rect x="4" y="14" width="148" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="30" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">[9,3,-7,12,0,…] 412</text>
  <path d="M152 26 H186" stroke="#6b6b6b" stroke-width="1.2"/><path d="M186 26 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="153" y="12" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">shrink</text>
  <rect x="188" y="14" width="106" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="200" y="30" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">[-7, 12, 0]</text>
  <path d="M294 26 H328" stroke="#6b6b6b" stroke-width="1.2"/><path d="M328 26 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="295" y="12" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">shrink</text>
  <rect x="330" y="14" width="126" height="24" fill="#e2fcf3" stroke="#0d7a7a" stroke-width="1.4"/>
  <text x="344" y="30" font-family="Consolas,monospace" font-size="8.5" fill="#0d7a7a">[-7]</text>
  <text x="4" y="62" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">same failure, smallest input that still reproduces it — usually the whole diagnosis</text>
</svg>

**A failure you cannot replay is noise.** fast-check prints the seed of a failed
run; Hypothesis saves the failing case to a local database and replays it first
next time.
