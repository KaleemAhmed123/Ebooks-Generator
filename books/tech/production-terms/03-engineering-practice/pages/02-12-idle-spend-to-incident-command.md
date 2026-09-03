## Idle Spend

Resources that are running, billed, and doing nothing: detached EBS volumes,
load balancers with no healthy targets, staging clusters at 3am on a Sunday.

Since February 2024 AWS charges $0.005 per hour for every public IPv4 address —
in use or idle, attached or not. One forgotten address is about $44 a year; the
few hundred left behind by deleted stacks are a line item nobody budgeted for.

**Idle spend hides because it is small per resource and never changes.** Anomaly
detection ignores it by construction, and no alarm fires on a resource whose
utilisation is zero. Only a scheduled sweep for unattached and unreferenced
resources finds it.

## Incident Command

The response structure borrowed from emergency management, where NIMS defines
the Incident Command System. PagerDuty keeps the shape intact: their incident
commander is "the single source of truth of what is currently happening" and is
explicitly "NOT a resolver".

<svg viewBox="0 0 460 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The incident commander sits at the centre and delegates to a subject matter expert, a scribe and a customer liaison, while performing none of the repair work directly">
  <rect x="14" y="30" width="136" height="24" fill="#e2fcf3" stroke="#0d7a7a" stroke-width="1.4"/>
  <text x="24" y="46" font-family="Georgia,serif" font-size="10" fill="#0d7a7a">Incident Commander</text>
  <text x="14" y="70" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">decides · delegates · never fixes</text>
  <path d="M150 42 H196 V16 H239" stroke="#1a1a1a" stroke-width="1.1" fill="none"/>
  <path d="M246 16 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M150 42 H239" stroke="#1a1a1a" stroke-width="1.1" fill="none"/>
  <path d="M246 42 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M150 42 H196 V70 H239" stroke="#1a1a1a" stroke-width="1.1" fill="none"/>
  <path d="M246 70 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="248" y="6" width="200" height="20" fill="none" stroke="#e0e0e4" stroke-width="1"/>
  <text x="256" y="20" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">subject matter expert — diagnoses, repairs</text>
  <rect x="248" y="32" width="200" height="20" fill="none" stroke="#e0e0e4" stroke-width="1"/>
  <text x="256" y="46" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">scribe — timeline and decisions</text>
  <rect x="248" y="60" width="200" height="20" fill="none" stroke="#e0e0e4" stroke-width="1"/>
  <text x="256" y="74" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">customer liaison — external comms</text>
</svg>

**The best debugger in the room is the wrong commander**, because taking the
role takes them off the keyboard.
