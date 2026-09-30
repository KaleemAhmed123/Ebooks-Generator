## Voice cloning

- **Voice cloning** makes a TTS system speak in a *specific* person's voice. Modern systems do it **zero-shot**: a few seconds of reference audio is enough, with no per-voice retraining.
- The mechanism: a speaker embedding (from the speaker-recognition page) captures the target voice's identity, and the TTS model conditions on it — generating the requested text with that voice's timbre and style.
- This is the same pattern as prompting: the reference clip is a "voice prompt" the generator copies.

<svg viewBox="0 0 330 84" role="img" aria-label="A short reference clip plus target text feed a TTS model that outputs speech in the reference voice" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M12 24 Q20 12 28 24 T44 24" stroke="#24405e" fill="none"/><text x="28" y="40" text-anchor="middle" fill="#6b6b6b">3s of a voice</text>
  <rect x="10" y="50" width="60" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="40" y="63" text-anchor="middle">"read this"</text>
  <path d="M74 30 L108 38" stroke="#1a1a1a" marker-end="url(#vc)"/><path d="M74 59 L108 46" stroke="#1a1a1a" marker-end="url(#vc)"/>
  <rect x="112" y="30" width="60" height="26" rx="3" fill="#1a3a2a"/><text x="142" y="47" text-anchor="middle" fill="#fff">TTS</text>
  <path d="M174 43 L206 43" stroke="#1a1a1a" marker-end="url(#vc)"/>
  <path d="M214 43 Q222 31 230 43 T246 43 Q254 55 262 43 T278 43" stroke="#c0392b" fill="none"/><text x="246" y="70" text-anchor="middle" fill="#6b6b6b">their voice, new words</text>
  <defs><marker id="vc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
This is the most abuse-prone technique in the module. Cloned voices drive fraud ("your child is in trouble, send money"), bypass voice authentication, and spread disinformation. Legitimate products require **verified consent** from the voice's owner, refuse public-figure targets, and watermark their output (page 06-17). Build it with those guardrails or not at all.
:::
