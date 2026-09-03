# Infra, Cloud & Security

## How to read this booklet

Thirty-eight terms, alphabetical. Each one gets three things and nothing else:
what it means, where it bites, and a picture when a picture is faster than a
sentence.

The contents page lists every term with its page number. That is the point of
the book — you half-remember a phrase from an incident review, you look it up,
you have the real meaning in twenty seconds.

### What counts as a term here

Four areas share this booklet because in production they share a blast radius:
containers, cloud primitives, the proxy layer, and the attack surface all three
create. A term earned its place if getting it wrong causes an outage or a
breach, and if a senior engineer would say it out loud in a design review.

Cut were the vendor product names that change every year, the certification
vocabulary nobody uses at work, and the security terms that are only definitions
— `CIA triad`, `defence in depth`. Every entry here names a specific failure.

### What is deliberately not here

Teaching. This booklet does not show you how to write a Dockerfile or configure
an IAM policy. It tells you what someone means by *distroless* or *least
privilege*, and what goes wrong when they get it wrong.

Also not here: threat modelling, compliance frameworks, and anything that
depends on a specific console screen. Screens move. The failure modes do not.
