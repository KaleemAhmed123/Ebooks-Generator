## Bus Factor

*truck factor*

The number of people who would have to disappear before the work stalls.
Counted per component, not per team: a team of nine can carry a bus factor of
one on the payment path.

Almost every measurement is derived from commit history, which sees only who
wrote the code.

**Commit history misses the things that actually stop you.** The one account
that can rotate the production certificate, the only approver on the deploy
path, the person whose laptop holds the working copy of the vendor's test
credentials — none of that leaves a trace in `git log`.

## Change Freeze

A window in which production changes are blocked. Google's SRE workbook makes
the trigger measured rather than seasonal: exceed the error budget over the
preceding four-week window and the team halts "all changes and releases other
than P0 issues or security fixes" until the service is back inside its SLO.

A calendar freeze inverts that logic. It defers change on a date, without any
evidence the service needed the rest.

**A freeze does not remove risk, it concentrates it.** The release that lands
after a month-long freeze is the largest, least incrementally tested diff of the
year, and it ships into the week with the fewest people reachable.
