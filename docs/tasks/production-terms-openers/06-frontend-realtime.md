# Frontend & Realtime

## How to read this booklet

Forty-three terms, alphabetical. Each one gets what it means, where it bites,
and a picture when a picture is faster than a sentence.

The contents page lists every term with its page number. You half-remember a
phrase from a code review, you look it up, you have the real meaning in twenty
seconds.

### Three subjects, one alphabet

The browser, React and Next.js, and realtime transport are interleaved rather
than sectioned. You look a term up by its name, not by which layer it belongs
to — and in practice the layers do not stay separate anyway. A hydration
mismatch is a React problem caused by a browser API, and a sticky session is a
load balancer setting that decides whether your socket reconnects.

### What is deliberately not here

Syntax and API surface. This booklet does not teach hooks or the Next.js router.
It tells you what someone means by *stale closure* or *client boundary*, and
what breaks when they get it wrong.

The security terms — XSS, CSRF, CSP, cookie attributes, same-origin — are here
rather than in the security booklet because they are enforced by the browser and
you configure them from the frontend. Where the header is set is not where the
bug appears.

### The recurring theme

Most of these fail silently in development and only under real conditions: a
slow network, a cold cache, a screen reader, five hundred sockets, or a user
whose data set is larger than yours.
