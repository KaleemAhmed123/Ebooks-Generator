## Reconciliation

- The stream's counts are provisional. Every night a batch job reads the raw log for the day, dedupes by click id over the whole day, windows by event time with no watermark, because nothing is still arriving, and writes the final table. Where the two disagree, the batch wins and the difference is recorded. This is the lambda idea: a fast path for now, a slow path for the truth

<svg viewBox="0 0 460 140" role="img" aria-label="Reconciliation. One raw log feeds two paths. The stream path: aggregator with windows and watermark, page 3 and 4, writes provisional per-ad per-minute counts within a minute, shown on the dashboard. The batch path: at 02:00 a job reads the whole previous day from the raw log in object storage, dedupes by click id across the day, windows by event time with no watermark, adds the late-clicks table, and writes the final table. A reconciler compares the two tables per ad per minute, overwrites the provisional row with the final one, and logs every difference with its cause: late clicks past the watermark, a dedupe window that ended before a retry, a bug. Billing reads only the final table. An orange cross marks having no batch path: the stream's drift is never measured, so it is never noticed." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="46" width="70" height="44" rx="3" fill="#e6f2ff" stroke="#333"/><text x="41" y="60" text-anchor="middle">raw log</text><text x="41" y="72" text-anchor="middle" font-size="7">page 2; the one</text><text x="41" y="82" text-anchor="middle" font-size="7">source of both paths</text>
  <rect x="112" y="10" width="140" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="182" y="23" text-anchor="middle">stream: windows + watermark</text><text x="182" y="34" text-anchor="middle" font-size="7">pages 3 and 4; result within a minute</text><text x="182" y="44" text-anchor="middle" font-size="7">provisional</text>
  <line x1="76" y1="58" x2="112" y2="32" stroke="#333" marker-end="url(#d)"/>
  <rect x="112" y="80" width="140" height="50" rx="3" fill="#fff" stroke="#1d4e89"/><text x="182" y="93" text-anchor="middle">batch at 02:00: yesterday, whole</text><text x="182" y="104" text-anchor="middle" font-size="7">dedupe by click id over the day,</text><text x="182" y="114" text-anchor="middle" font-size="7">event-time windows, no watermark,</text><text x="182" y="124" text-anchor="middle" font-size="7">plus the late-clicks table (page 3)</text>
  <line x1="76" y1="78" x2="112" y2="102" stroke="#333" marker-end="url(#d)"/>
  <rect x="288" y="10" width="76" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="326" y="24" text-anchor="middle">provisional</text><text x="326" y="36" text-anchor="middle" font-size="7">ad × minute; dashboard</text>
  <line x1="252" y1="30" x2="288" y2="30" stroke="#333" marker-end="url(#d)"/>
  <rect x="288" y="90" width="76" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="326" y="104" text-anchor="middle">final table</text><text x="326" y="116" text-anchor="middle" font-size="7">ad × minute; billing</text>
  <line x1="252" y1="110" x2="288" y2="110" stroke="#333" marker-end="url(#d)"/>
  <rect x="392" y="46" width="62" height="48" rx="3" fill="#fff" stroke="#1d4e89"/><text x="423" y="59" text-anchor="middle">reconciler</text><text x="423" y="70" text-anchor="middle" font-size="7">compare rows,</text><text x="423" y="80" text-anchor="middle" font-size="7">final overwrites,</text><text x="423" y="90" text-anchor="middle" font-size="7">log each diff</text>
  <line x1="364" y1="36" x2="392" y2="56" stroke="#333" marker-end="url(#d)"/><line x1="364" y1="104" x2="392" y2="84" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="138" font-size="7.5" fill="#bf4c28">✕ no batch path: the stream's drift (late clicks, a dedupe window closed before a retry, a bug) is never measured, so never noticed</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- The difference per day is the health metric of the stream: near zero and explained by late clicks means the watermark is right; growing means a bug, and the batch has already corrected the invoice before anyone reads it. Booklet 04 owns batch versus stream as a choice; here it is not a choice, both run, and they disagree on purpose
- The batch is also the replay tool: a counting bug found on Thursday is fixed and the job rerun over Monday's log, which is the reason the log is kept for 90 days (page 1)

### The failure

- No batch path. The stream is checkpointed, deduped and windowed correctly, and it drifts anyway: a click past the watermark, a dedupe window that closed before a retry, a deploy with a bug. Without a second computation from the source there is no number to compare against, and an invoice with an unmeasured error is an invoice with an unknown error
