## DSPy: programming, not prompting

- **DSPy** (Stanford) is the odd one out. It is not an orchestration framework — it is a way to **program** LLM pipelines and then **compile** them, so the prompts are *generated and optimized automatically* instead of hand-written. The pitch: stop tweaking prompt strings; declare *what* you want and let DSPy figure out the prompt. **[VERIFY current API]**

<svg viewBox="0 0 360 92" role="img" aria-label="You declare intent; DSPy's compiler generates and optimizes the actual prompts against a metric" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="34" width="90" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="47" text-anchor="middle" font-size="6">you declare</text><text x="55" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"question → answer"</text>
  <rect x="130" y="30" width="100" height="34" rx="4" fill="#a03050"/><text x="180" y="44" text-anchor="middle" fill="#fff" font-size="6.5">DSPy compiler</text><text x="180" y="55" text-anchor="middle" fill="#fc8" font-size="5.5">optimizes prompts</text>
  <rect x="260" y="34" width="90" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="305" y="47" text-anchor="middle" font-size="6">tuned prompt +</text><text x="305" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">few-shot examples</text>
  <path d="M100 47 L128 47" stroke="#888" marker-end="url(#ds)"/><path d="M230 47 L258 47" stroke="#888" marker-end="url(#ds)"/>
  <defs><marker id="ds" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The core analogy:** DSPy is to prompting what a **compiler** is to assembly. You write high-level code (declare the task's input/output); DSPy compiles it into optimized prompts — choosing wording, few-shot examples, even reasoning steps — tuned against a metric on your data. You stop hand-crafting the "assembly" of prompt strings.
- **Why this matters:** hand-tuned prompts are brittle, model-specific, and do not transfer. Change the model and your carefully-tuned prompt degrades. DSPy **re-compiles** for the new model, re-optimizing automatically — prompts become a *build artifact*, not hand-maintained source.
- It is included here because agents *are* prompt pipelines, and DSPy offers a fundamentally different way to build and *optimize* them — increasingly relevant as reliability and portability matter more.

:::note
DSPy asks you to think differently: **separate the program's structure (what steps, what flows to what) from the prompts (how each step is phrased).** You write and maintain the structure; DSPy owns the phrasing and optimizes it. This mirrors how we stopped writing assembly by hand once compilers were good enough. Whether prompting follows the same path is an open bet — but DSPy is the clearest expression of it, and worth understanding as a direction, not just a library.
:::
