## Alert Fatigue

Non-actionable pages train people to ignore the pager, and the training works
just as well on the real one.

Sixty pages a week, fifty-eight of which resolve themselves. At 3am on the night
it matters, on-call silences the page by reflex before reading it.

An alert survives three questions: can a human do something about it now, can it
wait until morning, and is there a runbook behind it. Anything that fails one is
a ticket or a dashboard panel, not a page.

## Backpressure

Work arriving faster than you can finish it, and the system pushing back instead
of quietly accumulating.

A flash sale delivers 500,000 checkout hits in ten seconds against capacity of
10,000 per second. Something has to give: queue it, slow the accepts, or shed
it.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arrivals far exceed capacity, leaving three options: queue the work, slow down the accepts, or shed load">
  <text x="4" y="17" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">arriving</text>
  <rect x="66" y="8" width="330" height="10" fill="#1a1a1a"/>
  <text x="402" y="17" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">500k</text>
  <text x="4" y="35" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">capacity</text>
  <rect x="66" y="26" width="66" height="10" fill="#d0212f"/>
  <text x="138" y="35" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">10k/s</text>
  <path d="M230 40 V50" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M230 52 l-4 -7 h8 z" fill="#1a1a1a"/>
  <rect x="24" y="56" width="120" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="84" y="73" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">queue it</text>
  <rect x="170" y="56" width="120" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="230" y="73" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">slow the accepts</text>
  <rect x="316" y="56" width="120" height="26" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="376" y="73" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">shed it</text>
</svg>

Pick none of the three and the queue grows until the process is killed for
memory — turning a two-minute slowdown into a cold restart under full load.

## Blameless Postmortem

Writing up an incident to fix the system rather than to identify who to punish.

| The write-up says | What it produces |
|---|---|
| the engineer ran the wrong migration | an apology, and information hidden next time |
| migrations run on production with no confirmation and no dry-run | a guardrail with an owner |

Blame is not primarily a kindness problem. It is an information problem: people
who expect to be named stop volunteering the detail that would have explained
the next outage.
