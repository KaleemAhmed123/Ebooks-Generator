## Cost per Successful Task

Total spend divided by tasks that actually completed, not by requests made.
Retries after validation failure, regenerations after a user rejected the
output, abandoned sessions and agent runs that hit a cap were all billed and
delivered nothing. Per-request pricing hides every one of them.

The reframing changes what you work on. Raising success from 70% to 85% cuts
cost per outcome by about 18% — the arithmetic is 1/0.70 against 1/0.85 —
without touching prompts, models or infrastructure, and it improves the product
while doing so, which switching to a cheaper model does not.

**Include human cost wherever a review step exists.** If 15% of documents need a
minute of someone's attention, that labour usually dwarfs the inference spend
entirely. Counting only the API bill sends teams to spend months optimising the
smaller number.

## Data Flywheel

The loop where production usage generates data that improves the system, which
drives more usage. It is the durable advantage in an AI product — anyone can
call the same model, and nobody else has your corrections.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Usage produces logs, which only become labelled examples if a capture mechanism records the corrected answer; those examples improve the system, which drives more usage">
  <rect x="4" y="16" width="88" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="48" y="32" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">usage</text>
  <path d="M94 28 H124" stroke="#1a1a1a" stroke-width="1.2"/><path d="M124 28 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="128" y="16" width="126" height="24" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="191" y="32" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#c25a35">capture mechanism</text>
  <path d="M256 28 H286" stroke="#1a1a1a" stroke-width="1.2"/><path d="M286 28 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="290" y="16" width="110" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="345" y="32" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">labelled examples</text>
  <path d="M400 40 V58 H48 V42" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M48 42 l-4 7 h8 z" fill="#1a1a1a"/>
  <text x="224" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">remove the middle box and the loop is just a growing log bill</text>
</svg>

Turning usage into training data takes mechanism: a review queue that records
what the corrected answer was, feedback controls whose results are stored in a
usable shape, outcome tracking that knows whether the task completed.

**A thumbs-down is a signal; an edited output is a training example.** The
difference in value is enormous and the difference in interface work is a text
field. A year of uncaptured usage is a year the flywheel did not turn, and it
cannot be recovered afterwards.
