## Write-Ahead Log

*WAL*

Changes are written to a durable log before the data files are touched. It is
what makes crash recovery, replication and point-in-time recovery possible at
all.

Power loss mid-write: on restart Postgres replays the WAL and the database is
consistent. Nothing is half-applied, because the log was fsynced before the
client was told the write succeeded.

The same stream does three jobs. Replicas consume it to stay current, PITR
replays it to reach an exact moment, and change data capture tools read it to
publish row changes.

**One log, four consumers.** That is why WAL configuration shows up in
conversations about replication lag, backup strategy and CDC pipelines that
otherwise have nothing to do with each other.

## Write-Through vs Write-Behind

Write-through updates cache and database together — consistent, slower writes.
Write-behind updates the cache and flushes later — fast, and lossy on a crash.

Write-behind for a view counter is fine; losing five seconds of counts costs
nothing. Write-behind for an order is not.

The question is not which is faster. It is what a crash during the flush window
destroys, and whether anyone would notice it was missing.
