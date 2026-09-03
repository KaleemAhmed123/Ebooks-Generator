## Least Privilege

A policy grants exactly the permissions the code uses and nothing past them.
`s3:*` on `*` is the single line that turns one compromised service into a full
account breach.

A thumbnail service reads one bucket prefix. It ships with `s3:*` on `*`
because that is what made the error go away on a Friday.

Start deny-all and add what breaks. Widening a policy is a two-minute change
with a reviewer watching; narrowing one that already works has no forcing
function and never gets scheduled.

| Policy | Blast radius |
|---|---|
| `s3:*` on `*` | every bucket in the account |
| `s3:GetObject` on `arn:...:bucket/uploads/*` | one prefix, read only |

## mTLS

*mutual TLS*

Both ends present certificates, so the server verifies the client's identity as
well as the reverse. Sitting inside the network stops counting as evidence of
anything.

Service A reaches service B only by presenting a valid client certificate. A
compromised pod in the same VPC without one talks to nothing.

The mesh sidecar normally issues and rotates the certificates. Do it by hand
and you own an expiry calendar — an expired client certificate arrives as a
connection reset, not as an error naming the certificate.
