## Reconciliation

- Every night, compare what the ledger says happened yesterday against what the PSP says it settled, row by row, by the PSP's charge id. Idempotency keys, conditional transitions and signed webhooks each close one hole; **reconciliation** is the check that finds the holes nobody closed, because the PSP's record was written by a system the design does not control

<svg viewBox="0 0 460 132" role="img" aria-label="Reconciliation. Inputs: our ledger, yesterday's captures and refunds keyed by PSP charge id, and the PSP's settlement file, a nightly file of every charge and fee it processed. A reconciler batch job joins them by charge id and produces four outcomes: match, close the day; in the ledger but not at the PSP, we shipped and were not paid; at the PSP but not in the ledger, the customer was charged and has no order; amounts differ, usually a fee or currency issue. The last three go to a discrepancy queue worked by people. An orange cross marks having no reconciliation because the system is exactly-once: the PSP is not inside that transaction, and a 0.1 percent drift at 1 000 a second is 86 400 unexplained payments a day." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="20" width="96" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="54" y="33" text-anchor="middle">our ledger</text><text x="54" y="44" text-anchor="middle" font-size="7">yesterday's captures, refunds</text><text x="54" y="54" text-anchor="middle" font-size="7">keyed by PSP charge id</text>
  <rect x="6" y="76" width="96" height="40" rx="3" fill="#fff" stroke="#b8541a"/><text x="54" y="89" text-anchor="middle">PSP settlement file</text><text x="54" y="100" text-anchor="middle" font-size="7">nightly: every charge and</text><text x="54" y="110" text-anchor="middle" font-size="7">fee the PSP processed</text>
  <rect x="150" y="48" width="84" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="192" y="62" text-anchor="middle">reconciler</text><text x="192" y="73" text-anchor="middle" font-size="7">nightly batch job</text><text x="192" y="83" text-anchor="middle" font-size="7">join by charge id</text>
  <line x1="102" y1="44" x2="150" y2="60" stroke="#333" marker-end="url(#d)"/><line x1="102" y1="92" x2="150" y2="76" stroke="#b8541a" marker-end="url(#o)"/>
  <rect x="270" y="6" width="112" height="20" rx="3" fill="#fff" stroke="#333"/><text x="326" y="19" text-anchor="middle" font-size="7.5">match → close the day</text>
  <rect x="270" y="34" width="112" height="26" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="326" y="45" text-anchor="middle" font-size="7">in ledger, not at PSP:</text><text x="326" y="55" text-anchor="middle" font-size="7">shipped, never paid</text>
  <rect x="270" y="68" width="112" height="26" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="326" y="79" text-anchor="middle" font-size="7">at PSP, not in ledger:</text><text x="326" y="89" text-anchor="middle" font-size="7">charged, no order</text>
  <rect x="270" y="102" width="112" height="20" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="326" y="115" text-anchor="middle" font-size="7">amounts differ: fee, currency</text>
  <line x1="234" y1="56" x2="270" y2="16" stroke="#333" marker-end="url(#d)"/><line x1="234" y1="62" x2="270" y2="47" stroke="#333" marker-end="url(#d)"/><line x1="234" y1="74" x2="270" y2="81" stroke="#333" marker-end="url(#d)"/><line x1="234" y1="80" x2="270" y2="112" stroke="#333" marker-end="url(#d)"/>
  <rect x="400" y="52" width="54" height="40" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="427" y="66" text-anchor="middle" font-size="7">discrepancy</text><text x="427" y="76" text-anchor="middle" font-size="7">queue,</text><text x="427" y="86" text-anchor="middle" font-size="7">for people</text>
  <line x1="382" y1="47" x2="400" y2="62" stroke="#bf4c28" marker-end="url(#e)"/><line x1="382" y1="81" x2="400" y2="76" stroke="#bf4c28" marker-end="url(#e)"/><line x1="382" y1="112" x2="400" y2="88" stroke="#bf4c28" marker-end="url(#e)"/>
  <text x="150" y="128" font-size="7.5" fill="#bf4c28">✕ "we are exactly-once, so no reconciliation": the PSP is not in that transaction</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="o" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#b8541a"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- The join key is the PSP's id for the charge, stored on the payment row at intent creation (page 4), so a payment the design lost track of is still findable from the PSP's side. The settlement file is the PSP's own truth, and a webhook that was never delivered shows up here as "at PSP, not in ledger"
- Three outcomes go to people, in a queue with an owner and an age alarm, not to an automated fixer: the fix for "charged, no order" is a refund or a fulfilment, and which one is a business decision. The reconciler's own output is also ledgered, so the day's discrepancies are a number that trends
- The batch is a batch on purpose: a day's rows, joined once, is cheaper and more complete than a stream, and the PSP's file arrives once a day anyway (booklet 04 on batch vs stream)

### The failure

- No reconciliation, because the system is "exactly-once". Idempotency keys and transactions cover the design's own writes; they cannot see a webhook the PSP never sent, a bug on the PSP's side, or a capture that succeeded after the design gave up. A drift of 0.1 % at 1 000 payments a second is 86 400 unexplained payments a day, found by customers instead of by a job
