## Zero-Downtime Migration

Changing a schema in phases so that old and new code both work throughout —
which is required, because during a rolling deploy both are running at once.

Renaming a column in one release breaks whichever version is mid-deploy.
Expand-contract takes four releases and breaks nothing:

1. **Expand** — add the new column, nullable, written by nobody.
2. **Dual-write** — write both, and backfill the existing rows in batches.
3. **Switch reads** — read from the new column, verify the two agree.
4. **Contract** — stop writing the old one, then drop it.

Each step is separately deployable and separately reversible. Four boring
releases beat one exciting outage, and the temptation to compress them is
strongest exactly when the schedule is tightest.
