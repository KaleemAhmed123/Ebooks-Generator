## Warm-Up & JIT Effects

A managed runtime's first seconds are not representative of its steady state.
Code starts interpreted and tiers up as it gets hot: V8 runs Ignition bytecode,
then Sparkplug, then Maglev, then TurboFan, with Maglev shipping in Chrome 117.

JMH defaults to five warm-up iterations of ten seconds each before it records
anything. That default is the size of the problem, set by people who measure the
JVM for a living.

**Warm-up is not only the compiler.** Caches fill, pools open, the heap reaches
its working size and lazy class loading finishes. Warm the JIT but not the
connection pool and you have measured a hot CPU talking to a cold database.
