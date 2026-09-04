## Indirect Prompt Injection

Injection arriving through content the system fetched rather than from the person
typing. OWASP's 2025 Top 10 for LLM Applications files it under LLM01 beside
direct injection: an LLM processes an external source and embedded content alters
its behaviour.

The surface is everything the agent can read — web pages, PDFs, emails, calendar
invites, code comments, API responses, another tenant's rows. The user never typed
the instruction and never saw it; it was white text on white, or an HTML comment.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A fetched web page carries hidden instructions into the model's context, and the model then drives a tool with real-world side effects">
  <rect x="4" y="16" width="104" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="56" y="32" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">fetched page</text>
  <path d="M108 29 H150" stroke="#1a1a1a" stroke-width="1.2"/><path d="M150 29 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="152" y="16" width="104" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="204" y="32" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">context</text>
  <path d="M256 29 H298" stroke="#1a1a1a" stroke-width="1.2"/><path d="M298 29 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="300" y="16" width="128" height="26" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="364" y="32" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">send_email, pay, delete</text>
  <text x="4" y="60" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">no boundary is crossed anywhere on this line — the instruction is only more text</text>
  <text x="4" y="71" font-family="Georgia,serif" font-size="9" fill="#c25a35">the tools on the right decide how bad it gets</text>
</svg>

**Severity is set by the tools, not by the text.** A model that can only talk is
embarrassing when injected; one that can spend money is an incident. Treat every
byte of tool output as hostile input and keep the agent's credentials narrow.

## Ingestion Pipeline

The path from source document to indexed chunk: fetch, parse, clean, chunk,
enrich, embed, upsert. Each stage fails in its own way and needs its own counter
and its own retry rule.

The characteristic failure is silence. A PDF the parser cannot read produces zero
chunks; an embedding call that times out produces nothing. The pipeline continues
happily, the document is absent, and nothing anywhere records that it should have
been there. Count at every boundary; send failures to a dead-letter queue with the
reason attached, never to a swallowed exception.

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Documents pass through fetch, parse, chunk, embed and upsert stages, with a count recorded at every boundary so a drop is visible">
  <text x="4" y="14" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">count at every boundary</text>
  <g font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
    <rect x="4" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="35" y="34" text-anchor="middle">fetch</text>
    <rect x="80" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="111" y="34" text-anchor="middle">parse</text>
    <rect x="156" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="187" y="34" text-anchor="middle">chunk</text>
    <rect x="232" y="20" width="62" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.1"/><text x="263" y="34" text-anchor="middle">embed</text>
    <rect x="308" y="20" width="62" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.2"/><text x="339" y="34" text-anchor="middle" fill="#c25a35">upsert</text>
  </g>
  <g stroke="#1a1a1a" stroke-width="1.1" fill="#1a1a1a">
    <path d="M68 30 H76"/><path d="M76 30 l-5 -3 v6 z"/>
    <path d="M144 30 H152"/><path d="M152 30 l-5 -3 v6 z"/>
    <path d="M220 30 H228"/><path d="M228 30 l-5 -3 v6 z"/>
    <path d="M296 30 H304"/><path d="M304 30 l-5 -3 v6 z"/>
  </g>
  <text x="380" y="30" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">counts stop</text>
  <text x="380" y="41" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">matching → found it</text>
</svg>

**Make it idempotent and resumable on day one.** You will reprocess — after a
parser fix, a chunking change, an embedding upgrade. Key on document ID plus
content hash so a rerun updates in place instead of duplicating the corpus.
