## Eval Drift

Quality falling over time while your code stays exactly the same. Three things
move underneath you: the provider updates an unpinned model, users ask different
things as the product grows, and the corpus grows or gets noisier so retrieval
quietly worsens.

None of these produces an error. No failed deploy, no exception, no alert — the
system keeps returning fluent answers that are slowly getting worse, and nobody
notices until support volume rises. Pin model versions so at least one variable
is yours; every Claude model ID is a pinned snapshot with a published retirement
date.

**Run the evaluation on a schedule, not only on deploy.** CI feels sufficient
and is not — the whole point of drift is that nothing changed on your side, so
nothing triggered CI. A weekly run tracked over time turns an invisible decline
into a dated line on a graph.

## Evaluation Harness

The runnable system that puts a dataset through a configuration, scores the
outputs and reports. Three properties decide whether it is actually used: one
command to run it, minutes rather than hours — which in practice means
parallelising the calls — and a comparison against a baseline, because an
absolute score answers nothing on its own.

The output that matters is per-case, not aggregate. "84% against 81%" gives you
the direction. The list of cases that regressed tells you what broke, and that
is the part you can act on.

**Build it before you start optimising, not after.** Wire it into CI on any
change to prompts, models or retrieval configuration, and post the delta on the
pull request. Once the score sits next to the diff, arguments about whether a
change helps stop being arguments.
