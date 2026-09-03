## Model Version Pinning

Requesting a specific dated model version rather than a floating alias, so the
provider updating the model does not silently change your product.

An app on a floating alias woke to a new model with different formatting
behaviour and a nine-point accuracy drop. Nothing in their repository had
changed.

### How it works

Providers offer two ways to name a model: a floating alias that always points at
the current version, and a dated identifier that never moves.

The alias is convenient, and it hands control of your product's behaviour to
someone else's release schedule. When the provider ships an update your output
changes — formatting shifts, edge cases resolve differently, accuracy moves in
one direction or the other — with no deploy on your side and nothing in your
changelog to explain it.

Pinning to a dated version makes the model a dependency you upgrade
deliberately, exactly like any library.

**The cost is that you then have to actually do the upgrades**, because pinned
versions eventually get deprecated. That is a real obligation, and it is still
far better than being surprised.

### In practice

**Pinning is what makes evaluation meaningful.** If the model can change
underneath you, a score from last month describes a system that no longer
exists, and you cannot attribute a quality change to your own work.

Pin first, then build the evaluation harness — in that order. Reversed, the
harness spends its first weeks measuring noise and teaching everyone to distrust
it.
