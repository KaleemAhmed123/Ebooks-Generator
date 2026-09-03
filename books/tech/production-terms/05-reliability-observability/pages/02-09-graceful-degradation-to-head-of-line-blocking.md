## Graceful Degradation

Losing a feature instead of losing the product when a dependency fails.

The recommendation service dies. The homepage still renders, with a static
bestsellers list where the personalised rail was. Users notice worse
suggestions, not an outage.

The degraded path is code nobody runs. It is written once, never exercised, and
discovered to be broken on the one day it was supposed to save you. If the
fallback is not in a test that kills the dependency, assume it does not work.

## Grafana Dashboard Discipline

A dashboard answers a question. Forty panels of everything is read by nobody.

| Row | What it answers |
|---|---|
| 1 | is it broken? — SLI, error rate |
| 2 | where? — per-endpoint, per-dependency |
| 3 | why? — resources, saturation |

Drill-downs belong behind links, not on the overview. The dashboard that shows
everything is the one people scroll past while the incident runs.

## Head-of-Line Blocking

One slow item at the front of a queue stalls everything behind it, including
work that would have been instant.

A 400-page PDF sits at the head of the OCR queue for nine minutes. Two thousand
one-page invoices wait behind it, each of which takes 200ms.

<svg viewBox="0 0 460 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 400-page document at the head of a shared queue holds up two thousand one-page jobs behind it">
  <text x="4" y="25" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">out</text>
  <path d="M40 21 H26" stroke="#1a1a1a" stroke-width="1.3"/><path d="M24 21 l7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="44" y="8" width="150" height="26" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="119" y="25" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#d0212f">400-page PDF · 9 min</text>
  <rect x="200" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="226" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="252" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="278" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="304" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="330" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="356" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="382" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="408" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="434" y="8" width="20" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="119" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">head of line</text>
  <text x="327" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">2,000 invoices · 200ms each · all waiting</text>
</svg>

Adding workers does not fix it while the queue is shared. Split by size class,
so a nine-minute job can only ever block other nine-minute jobs.
