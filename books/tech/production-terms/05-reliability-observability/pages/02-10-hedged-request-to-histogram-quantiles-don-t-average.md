## Hedged Request

Send a duplicate to a second replica once the first is slower than P95, and take
whichever answers first.

| t | What happens |
|---|---|
| 0 | ask replica A |
| 100ms | A still silent — also ask B |
| 140ms | B answers, use it, cancel A |

Read P99 falls from 1.8s to 240ms for about 5% extra traffic, because only the
slow tail is ever hedged. Hedge below the P95 threshold and you duplicate
everything: double the load, and no tail improvement to show for it.

## Histogram Quantiles Don't Average

You cannot average P99s across instances. Averaging percentiles is arithmetic on
the wrong object.

Three pods report a P99 of 100ms, 100ms and 3s. The mean says 1.07s. The real
fleet-wide P99 comes from summing the raw buckets first —
`histogram_quantile(0.99, sum(rate(bucket[5m])) by (le))`.

The averaged number is not merely imprecise. It describes no request anyone
made, and it hides the one pod that is dying.
