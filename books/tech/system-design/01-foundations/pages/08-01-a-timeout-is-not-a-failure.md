# Module 8 - Timeouts

## A timeout proves nothing

- The caller sets a timeout. It fires. The caller knows one thing: no answer arrived in time. The caller does **not** know what happened to the request

<svg viewBox="0 0 460 78" role="img" aria-label="Five paths for a request that times out: lost on the way, crashed during processing, slow processing, processed but reply lost, or still running" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="24" width="46" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="27" y="40" text-anchor="middle">caller</text>
  
  <path d="M54 36 L116 12" stroke="#1a1a1a" fill="none"/><path d="M116 12 l-7 -1 v6 z" fill="#1a1a1a"/>
  <text x="124" y="15" font-size="8" fill="#b8541a">lost on the way</text>
  
  <path d="M54 36 L116 26" stroke="#1a1a1a" fill="none"/><path d="M116 26 l-7 -2 v6 z" fill="#1a1a1a"/>
  <text x="124" y="29" font-size="8" fill="#b8541a">crashed before finish</text>
  
  <path d="M54 36 L116 40" stroke="#1a1a1a" fill="none"/><path d="M116 40 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="124" y="43" font-size="8" fill="#b8541a">finished, reply lost</text>
  
  <path d="M54 36 L116 54" stroke="#1a1a1a" fill="none"/><path d="M116 54 l-7 -5 v6 z" fill="#1a1a1a"/>
  <text x="124" y="57" font-size="8" fill="#b8541a">still running</text>
  
  <path d="M54 36 L116 68" stroke="#1a1a1a" fill="none"/><path d="M116 68 l-7 -6 v6 z" fill="#1a1a1a"/>
  <text x="124" y="71" font-size="8" fill="#b8541a">reply is in flight, late</text>
</svg>

- In three of those five cases, the server did the work. A timeout does not mean the work failed. It means the caller stopped waiting
- This ambiguity is why Module 10 (idempotency) exists. You cannot safely retry a timeout on a mutating request unless the receiver knows how to deduplicate it

### The failure

- Treating a timeout on a payment request as a declined payment. The server processed the charge, but the reply was lost. The client sees a timeout, tells the user "payment failed", and the user tries again. Two charges
- When a timeout fires on a mutating request, the state is **unknown**. The only safe actions are to check the status or send an idempotent retry
