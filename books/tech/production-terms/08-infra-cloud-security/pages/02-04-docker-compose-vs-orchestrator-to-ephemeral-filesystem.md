## Docker Compose vs Orchestrator

Compose starts containers on one host. It has no scheduler, no self-healing, no
rolling update, and no placement across nodes.

That is fine until the host reboots. Kubernetes or ECS notices a dead container
and reschedules it somewhere else; Compose leaves it dead until a human logs in
and reads the same YAML file you wrote a year ago.

Compose in production is not a small orchestrator. It is a single point of
failure with a config file.

|  | Compose | K8s / ECS |
|---|---|---|
| hosts | one | many |
| dead container | stays dead | rescheduled |
| deploy | stop, then start | rolling, with rollback |

## Ephemeral Filesystem

The container's writable layer dies with the container. Anything written there
rather than to a volume is gone at the next deploy.

Uploads saved to `/tmp/uploads` behave perfectly in staging, where one pod runs
and never moves. In production the pod is rescheduled and the files are simply
absent — with nothing in the logs, because every write succeeded.

Object storage, a mounted volume, or a database. Local disk is a cache, never a
record.
