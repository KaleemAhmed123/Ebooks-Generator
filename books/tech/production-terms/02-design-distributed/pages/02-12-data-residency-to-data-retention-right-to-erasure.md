## Data Residency

Legal requirements that particular data physically stays inside a jurisdiction.
It constrains the architecture before any technical consideration gets a vote.

If EU user data cannot leave the EU, a single global primary is illegal no
matter how well it performs. That decides your sharding key, and it decides it
before you have written anything.

The scope is wider than the database, which is where teams get caught: replicas,
backups, log shipping, analytics exports, the error tracker, and the support
tool an agent uses to look up an account. Establish it before designing, not
during the audit.

## Data Retention & Right to Erasure

Deciding how long each class of data lives, and how it is genuinely removed —
including from replicas, caches, search indexes, the warehouse, logs and
backups.

Deleting a user row leaves that user in last night's backup, the search index,
six months of logs and the analytics warehouse. Every one of those is a copy,
and a deletion request covers all of them.

Backups are the hard case, because a backup cannot be rewritten without being
broken. **Crypto-shredding** is the standard answer: encrypt each user's data
under a key that is theirs alone, and destroy the key on erasure. The ciphertext
stays in the archive and is permanently unreadable, which satisfies the
requirement without touching the archive itself.
