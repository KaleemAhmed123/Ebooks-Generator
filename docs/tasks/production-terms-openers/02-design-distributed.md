# Design & Distributed

## How to read this booklet

Seventy-five terms, alphabetical. Each one gets three things and nothing else:
what it means, where it bites, and a picture when a picture is faster than a
sentence.

The contents page lists every term with its page number. That is the point of
the book — you half-remember a phrase from a design review, you look it up, you
have the real meaning in twenty seconds.

### What counts as a term here

A term earned its place if a senior engineer would say it out loud in a design
review, a postmortem, or an interview. Two hundred and four terms from the
source material did not survive that test.

Cut were the ones nobody says (`vector clock`, `PACELC`), the ones everybody
already knows (`load balancer`, `SQL injection`), the ones with nothing behind
the name (`design for failure`), and the design-interview set pieces — the URL
shortener, the news feed — which are exercises, not vocabulary.

### What is deliberately not here

Teaching. This booklet does not explain how to build a rate limiter; the
backend series does that at length. It tells you what someone means when they
say *token bucket*, and what goes wrong when they get it wrong.

Overlap with the other books is intentional. A term appears here because you
might need it in a hurry, and there because you might need to build it.
