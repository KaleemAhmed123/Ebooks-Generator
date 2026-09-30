## The tool-use round trip

- Calling a tool is never one request. It is a **round trip**: the model pauses to ask, your code runs the function, and the model resumes with the result. Trace it once and every agent framework becomes legible.

<svg viewBox="0 0 360 132" role="img" aria-label="Five steps: user asks, model requests a tool, your code runs it, result returns, model answers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="10" width="70" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="43" y="22" text-anchor="middle" font-size="6">1 user asks</text>
  <rect x="8" y="34" width="70" height="18" rx="3" fill="#24405e"/><text x="43" y="46" text-anchor="middle" fill="#fff" font-size="6">2 model: call</text>
  <rect x="8" y="58" width="70" height="18" rx="3" fill="#a03050"/><text x="43" y="70" text-anchor="middle" fill="#fff" font-size="6">3 you run it</text>
  <rect x="8" y="82" width="70" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="43" y="94" text-anchor="middle" font-size="6">4 result back</text>
  <rect x="8" y="106" width="70" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="43" y="118" text-anchor="middle" font-size="6">5 model answers</text>
  <rect x="150" y="20" width="200" height="100" rx="4" fill="#fbfbfd" stroke="#ddd"/>
  <text x="160" y="34" font-size="6.5" fill="#24405e">"What's the weather in Paris?"</text>
  <text x="160" y="50" font-size="6.5" fill="#a03050">↳ stop_reason: tool_use</text>
  <text x="160" y="60" font-size="6.5" fill="#a03050">  get_weather(city="Paris")</text>
  <text x="160" y="76" font-size="6.5">your code → API → {"temp":14,"sky":"rain"}</text>
  <text x="160" y="92" font-size="6.5" fill="#1a3a2a">feed result back into the conversation</text>
  <text x="160" y="108" font-size="6.5" fill="#1a3a2a">"It's 14°C and rainy in Paris."</text>
  <path d="M78 43 L148 60" stroke="#888" marker-end="url(#rt)"/><path d="M78 91 L148 84" stroke="#888" marker-end="url(#rt)"/>
  <defs><marker id="rt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The model does not run the tool.** It emits a *request* — "I want to call `get_weather` with `city=Paris`" — and stops, signalling `tool_use`. Running the function is **your** job. This separation is deliberate: it is your gate to validate, authorize, log, or refuse before anything executes.
- You append the tool's result to the conversation and call the model **again**. Now it has the data and writes the final answer. Two model calls, one tool run, for one user turn.
- Loop this — model asks for a tool, you run it, feed it back, model asks for another — and you have the **agent loop** (Module 14). Everything downstream is this round trip repeated.

:::warn
The round trip means **you** are in the execution path on every call, and that is a feature, not overhead. It is the only place you can enforce permissions, rate limits, and sanity checks. Frameworks that hide the round trip and auto-run every requested tool also hide your one chance to say no — which is exactly where prompt-injection attacks (later) get their leverage.
:::
