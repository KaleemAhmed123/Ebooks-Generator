# How to read this volume

Four hundred and fifty-six terms in eight topics, alphabetical inside each one.
The contents lists every one with its page. You half-remember a phrase from a
design review, you look it up, you have the real meaning in twenty seconds.

## What an entry gives you

**What it means** — one or two sentences, no preamble.

**Where it bites** — the concrete failure, with a real number wherever a primary
source gave one.

**The part nobody warns you about** — set apart on the page in the accent
colour. If you read nothing else on a page, read those.

A picture appears only where a picture is faster than a sentence, about one term
in five. Nothing here is decoration.

## What is deliberately not here

**Tutorials.** This does not teach you to build a rate limiter or write a
property-based test. It tells you what someone means by *token bucket* or
*shrinking*, and what breaks when they get it wrong.

**Syntax and API surface.** No hook signatures, no CLI flags, no configuration
reference. Those age in months and are one search away.

**Interview algorithms.** The most over-served topic in the industry and the
least used in production.

**Anything unverified.** Every claim was checked against a primary source: the
spec, the vendor's own pricing page, the project's own documentation. What could
not be checked was cut rather than softened, so a missing number means a number
nobody could stand behind.

## The recurring theme

Almost everything here fails quietly in development and only under real
conditions: a slow network, a cold cache, five hundred sockets, an invoice that
arrives a month after the feature shipped, or a data set larger than yours.
