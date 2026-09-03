## Asynchronous Apex

Four separate tools, four separate limit profiles. Async transactions get
roughly double the synchronous governor limits, which is why work gets pushed
out of the trigger rather than optimised inside it.

| | Takes | Notes |
|---|---|---|
| `@future` | primitives only | no chaining, no job ID |
| Queueable | objects | chainable, returns a job ID |
| Batch | 50M+ records | chunked, stateful |
| Scheduled | cron | wraps the others |

A callout from a trigger has to be async — there is no version of it that works
inline. Queueable is the default over `@future` because you can hand it an
object and track the job.

## BackgroundTasks vs Celery

FastAPI's `BackgroundTasks` runs after the response, in the same process, with
no broker behind it. Celery, RQ and Arq write the job to a broker first, so it
survives a crash, a restart or a deploy.

| | BackgroundTasks | Celery / RQ / Arq |
|---|---|---|
| Where it runs | same process | separate worker |
| Survives restart | no | yes |
| Retries | none | configurable |
| Visible | no | queue depth, failures |

A welcome email is a fine `BackgroundTasks` job. Charging a card or running a
four-minute OCR pass is not: a deploy lands mid-task and the work disappears
with no error anywhere.
