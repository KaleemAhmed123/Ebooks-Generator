## Evaluation Harness

The runnable system that scores model outputs against a dataset. Without one,
every change is judged by whoever tried three prompts and liked the result.

A harness that runs three hundred cases through the current and candidate
configurations and prints a scored diff turns a two-day argument into a
four-minute answer.

### How it works

The harness is the code that runs your dataset through a configuration, scores
the outputs, and reports. It is what stands between "this feels better" and a
number.

Three properties decide whether it actually gets used:

**One command.** If running it takes a checklist, it will not be run before the
change that needed it.

**Fast enough for the development loop.** Minutes, not hours, which in practice
means parallelising the calls. A harness that takes an hour gets run after the
decision instead of before it.

**A comparison against a baseline.** An absolute score answers nothing on its
own. The question is always "better or worse than what we have".

The output that matters most is per-case, not aggregate. "84% against 81%" gives
you the direction. The list of cases that regressed tells you what broke, and
that is the thing you can act on.

### In practice

Build it before you start optimising anything, not after. Optimising without
measurement is how a week goes into a change that made things worse.

Wire it into CI on any change to prompts, models or retrieval configuration, and
post the delta on the pull request. Once the score sits next to the diff,
arguments about whether a change helps stop being arguments.
