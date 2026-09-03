## Output Schema Repair

Handling structurally invalid output deterministically — repair, re-ask with the
validation error, then fail loudly — rather than letting a parse error surface
as a 500.

Instead of crashing on malformed JSON, the pipeline attempts a repair, re-asks
once including the exact validation error, then fails with a clear message.

### How it works

Even with constrained decoding, output sometimes fails validation: a value of
the wrong type, a missing required field, a response truncated mid-object
because the token limit was reached.

Without a defined path this surfaces as an unhandled exception three layers up
and a 500 for the user.

A repair ladder handles it deterministically:

| Step | Does |
|---|---|
| 1. Mechanical fixes | strip code fences, trim trailing commas, close an unterminated string |
| 2. Re-ask once | include the exact validation error — models correct readily when told what was wrong |
| 3. Fail loudly | clear message to the caller, raw output logged for later |

Three defined steps and then a clean failure, rather than an exception
propagating out of a JSON parser.

### In practice

**Log every repair and treat the repair rate as a quality metric.** It should be
low and stable.

A sudden rise means something changed — a model update, a prompt edit, a shift
in input distribution. Because the repairs succeed, this degradation is
completely invisible unless somebody is counting them. The system looks healthy
right up until the day a repair stops working.
