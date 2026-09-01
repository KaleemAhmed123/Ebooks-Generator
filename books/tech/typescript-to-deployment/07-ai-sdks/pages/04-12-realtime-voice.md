## Realtime and voice agents

- A voice assistant built as transcribe, then generate, then speak has three round trips and a two second gap before it answers
- **A realtime model takes audio in and streams audio out over one persistent connection**, which is what makes a conversation feel like one
- It is a different transport from everything else in this booklet: a WebSocket or WebRTC session, not a request

### The two architectures

| | Pipeline | Realtime |
|---|---|---|
| Shape | speech to text, model, text to speech | one bidirectional audio session |
| Latency | 1.5 to 3 seconds | a few hundred milliseconds |
| Control | you see the text at every step | audio in, audio out |
| Cost | three services | usually higher per minute |
| Fits | call summarization, dictation, IVR | live conversation |

### Where the backend sits

- **The browser must not hold the provider key**, so it cannot connect to the provider directly
- Your server mints a short-lived session token, the browser uses that for the media connection, and your server stays in the control path
- This is exactly the signalling role from the WebRTC chapter in Booklet 6, with a model as the far peer

### What it costs you in design

- **Tool calling still works**, and the tool runs on your server as always. That is how a voice agent looks up an order
- **Interruption is a feature.** A caller talking over the answer must cut generation, or the experience is unusable
- **Keep a text transcript of every session.** It is the only artifact you can log, evaluate, or show in a support review
- Billing is per minute of audio, so an idle open session is a real cost. Close them aggressively
