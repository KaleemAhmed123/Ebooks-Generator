## A real Node pipeline - continued

- **`services` starts real containers for the job.** Testing against a real Postgres catches what a mocked one never will
- **The health check is what makes it work.** Without it, tests start before Postgres accepts connections and fail on the first run and pass on the retry
- **`if: always()`** uploads the coverage report even when the tests failed, which is exactly when you want it
- Type check and lint are separate steps, so a failure names which one broke
