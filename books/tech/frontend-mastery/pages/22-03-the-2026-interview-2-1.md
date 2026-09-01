### When AI use is graded

What the interviewer is watching is not whether you can prompt. It is:

- **Do you know what to ask for?** Framing the problem correctly is the skill.
- **Do you read what came back?** Accepting a plausible wrong answer is the
  failure mode they are testing for.
- **Do you catch the specific things it gets wrong?** A missing auth check on a
  Server Action. A dependency that does not exist. An effect with a stale
  dependency array. Say it out loud when you spot it.
- **Do you verify?** Running the test, checking the docs, opening the page.
  Saying "let me confirm that" is worth more than being right by luck.
- **Do you know when to stop using it?** Reaching for an assistant on a
  four-line function is slower than typing it.

The uncomfortable framing that follows from the survey numbers: developers use
AI for around 60% of their work but can only fully hand off 0 to 20% of tasks.
**The interview is testing the gap**, not the 60%.

### The system design round

Ambiguous by design. There is no single correct architecture, and the evaluation
is your reasoning.

Time goes to diagrams, data flow, and defending choices, not to code. A workable
shape for 45 minutes:

| Minutes | Do |
|---|---|
| 0 to 5 | Clarify. Scale, devices, offline, SEO, real-time, who the users are |
| 5 to 10 | Draw the boxes: client, edge, API, cache, database |
| 10 to 25 | Rendering strategy, data fetching, state boundaries, caching |
| 25 to 35 | Performance, accessibility, error and loading states |
| 35 to 45 | Trade-offs, what breaks at ten times the scale, what you would build second |

**Ask about scale before you design.** A feed for a thousand users and a feed for
ten million are different systems, and picking without asking is the most common
way strong candidates lose this round.
