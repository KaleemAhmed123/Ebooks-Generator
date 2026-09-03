## Data Flywheel

The loop where production usage generates data that improves the system, which
drives more usage. It only exists if you deliberately capture the signal.

Corrections made in the review queue become labelled examples. Six months later
the review rate has halved, because the system learned from its own failures.

### How it works

Usage produces data, the data improves the system, a better system attracts more
usage. It compounds, and it is the durable advantage in an AI product — anyone
can call the same model, but nobody else has your corrections.

**The capture does not happen automatically.** Usage on its own produces logs,
not training data. Turning one into the other takes deliberate mechanism: a
review queue that records what the corrected answer was, feedback controls whose
results are stored in a usable shape, and outcome tracking that knows whether
the task actually completed.

Without those, you have traffic and a growing log bill.

The mechanisms are unglamorous, and they are worth building early, because the
compounding only starts once they exist. A year of uncaptured usage is a year of
the flywheel not turning, and it cannot be recovered afterwards.

### In practice

Design the capture so that a correction records **what right looks like**, not
merely that something was wrong.

A thumbs-down is a signal. An edited output is a training example. The
difference in value is enormous and the difference in interface work is a text
field, which makes it one of the better returns available anywhere in an AI
product.
