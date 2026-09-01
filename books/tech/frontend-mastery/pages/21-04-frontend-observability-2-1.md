### Lab data versus field data

This distinction decides which numbers you should believe.

| | Lab | Field |
|---|---|---|
| What it is | Lighthouse, WebPageTest, CI runs | Real User Monitoring, from actual sessions |
| Device | one machine, usually fast | every device your users own |
| Network | simulated | actual, including a train tunnel |
| Good for | catching a regression before merge | knowing what your users experience |
| Bad at | representing reality | telling you which change caused it |

You need both, and they will disagree. When they do, **the field data is the one
tied to revenue**, and the lab data is the one that tells you which commit did it.

Read the **75th percentile**, never the mean. An average is pulled down by fast
devices on fast networks and conceals the quarter of your users having a bad
time. Google's own Core Web Vitals thresholds are defined at p75 for exactly
this reason.
