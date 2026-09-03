# Engineering Practice

## How to read this booklet

Fifty-seven terms, alphabetical. Each one gets what it means, where it bites,
and a picture when a picture is faster than a sentence.

The contents page lists every term with its page number. You half-remember a
phrase from a planning meeting or a cost review, you look it up, you have the
real meaning in twenty seconds.

### Four subjects, one alphabet

Testing, performance, cost and process are interleaved rather than sectioned.
They belong together because they are the four things that decide whether a
system stays workable after it ships, and because in practice they are the same
argument seen from four sides. A flaky test suite is a process problem that
shows up as a cost. A connection pool sized by guesswork is a performance
problem that arrives as an incident.

### What is deliberately not here

Methodology. This booklet does not advocate for a framework, a ceremony or a
way of running a team. It tells you what someone means by *test double*,
*saturation* or *showback*, and what breaks when they get it wrong.

Nor is it a tutorial. It does not teach you to write a property-based test or
read a flame graph. It tells you what the thing is for, and the mistake that
makes it useless.

### The recurring theme

These are the parts of engineering nobody writes down. They are learned by
being on the wrong end of them: the bill that arrived after the feature
shipped, the test that only fails in CI, the freeze that turned four safe
releases into one dangerous one. Every entry names that failure, because the
failure is the part worth knowing.
