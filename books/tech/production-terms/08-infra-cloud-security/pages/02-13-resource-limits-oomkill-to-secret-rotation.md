## Resource Limits & OOMKill

Requests are what the scheduler reserves for the pod; limits are the hard
ceiling. The two ways of crossing a limit are not symmetrical.

A Node process under a 512Mi limit with no `--max-old-space-size` lets V8 grow
toward the container ceiling. The kernel kills it at 512Mi: exit code 137, no
stack trace, no shutdown hook. Tell the runtime about the limit, not just the
scheduler.

| Over the limit | What happens |
|---|---|
| CPU | throttled — slower, still alive |
| Memory | SIGKILL, exit 137, instant, no cleanup |

## S3 Consistency & Versioning

S3 has been strongly read-after-write consistent since December 2020. A
successful PUT is immediately readable, and the retry loops written to work
around the old behaviour are dead code.

Versioning is what makes damage reversible. Without it an overwrite is final;
with it every overwrite retains the previous object and a delete only writes a
delete marker. Add a lifecycle rule to expire old versions, or you pay storage
on every draft anyone ever saved.

## Secret Rotation

Replacing a credential on a schedule, and immediately after any suspicion, with
the old and the new one both valid for a window so nothing breaks mid-swap.

A key issued in 2021 and still in production is one leaked laptop from an
incident, and nobody can list the laptops that have seen it. Rotation that
requires downtime is rotation that never happens.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The new key is issued while the old one is still valid, consumers move across during the overlap window, and only then is the old key revoked">
  <rect x="196" y="16" width="104" height="46" fill="#e2fcf3" stroke="#3f7a33" stroke-width="1.4" stroke-dasharray="3 2"/>
  <text x="196" y="12" font-family="Georgia,serif" font-size="9" fill="#3f7a33">both valid</text>
  <text x="4" y="32" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">old key</text>
  <rect x="56" y="22" width="244" height="14" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="64" y="32" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">in use</text>
  <text x="304" y="32" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">revoked</text>
  <text x="4" y="56" font-family="Georgia,serif" font-size="9" fill="#3f7a33">new key</text>
  <rect x="196" y="46" width="260" height="14" fill="none" stroke="#3f7a33" stroke-width="1.2"/>
  <text x="204" y="56" font-family="Consolas,monospace" font-size="8.5" fill="#3f7a33">issued  →  in use</text>
  <text x="4" y="78" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">move the consumers, confirm the old key has no traffic, then revoke it</text>
</svg>
