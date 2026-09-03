## Cost Attribution & Tagging

Assigning every line of the bill to a team, product or feature through account
structure, tags and labels. The FinOps Foundation treats it as the capability
everything else rests on: without it, cost is one number nobody owns.

Applying a tag and activating it for billing are separate acts. On AWS a new tag
key can take up to 24 hours to appear for activation and another 24 to activate,
and a payer account is capped at 500 active cost allocation tag keys.

**Backfill restores activation, not tags.** AWS will retroactively apply a tag
key for up to twelve months, but only where the resource carried the tag at the
time. Untagged spend stays unallocated forever, which is why tagging belongs in
the provisioning path rather than in a quarterly clean-up.

## Coverage Is Not Confidence

Line coverage records which lines executed while the tests ran. It records
nothing about whether anything was asserted.

Delete every assertion in a suite and the coverage number does not move. A test
that calls a function and checks nothing scores the same as one that walks every
branch.

**Coverage is only reliable as a negative signal.** Uncovered code is definitely
untested; covered code has merely been visited — which is how a team meeting a
mandated threshold usually gets there, by testing whatever was easiest to reach.

## Definition of Done

The condition an increment must meet before it counts as finished. The Scrum
Guide attaches a real consequence: work that does not meet it "cannot be
released or even presented at the Sprint Review" and returns to the product
backlog. Teams sharing one product must comply with the same definition.

**A Definition of Done that stops at "tests pass" hands unfinished work to
whoever is on call.** Done for a production service also means the migration is
reversible, the alert exists, and the runbook entry names the failure — none of
which the author feels the absence of, because the author is not the one paged.
