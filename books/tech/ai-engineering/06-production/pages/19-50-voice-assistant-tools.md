## Voice assistant: tools and defense

- A useful voice assistant *does* things mid-conversation — checks an order, books a slot, answers from a knowledge base. That means tool calls (Booklet 5) and RAG (Flagship 3) inside the latency budget, which is the hard part: a slow tool stalls the whole conversation.

:::mint
```python
async def llm_with_tools(transcript, tools, send_audio):
    resp = await llm.chat(transcript, tools=tools)
    if resp.tool_calls:
        await send_audio(tts("one moment..."))          # fill the gap audibly
        results = await asyncio.gather(*[run(c) for c in resp.tool_calls])
        resp = await llm.chat(transcript + results)      # answer with results
    async for tok in llm.stream_from(resp): ...          # then speak
```
:::

- **Fill the silence.** A tool call takes hundreds of milliseconds to seconds — an eternity of dead air in a conversation. Speak a natural filler ("let me check that…") while the tool runs, so the pause feels conversational instead of broken. This is a UX trick with no analogue in text chat.
- **Defense.** Voice adds attack surface: ASR mishears (confirm high-stakes slots — amounts, names — before acting), and the assistant takes *spoken* actions (so least-privilege tools and confirmation on consequential ones, Module 18). Treat a transcribed instruction with the same suspicion as any untrusted input.

:::interview
"How do you handle a slow tool call in a voice agent without the conversation feeling broken?"

Two moves. **Audible filler** — speak a short natural phrase ("one sec, checking…") the instant a tool call starts, so the latency reads as conversational rather than dead air. **Parallelism and timeouts** — fire independent tool calls concurrently, cap each with a timeout, and have a graceful fallback ("I'm having trouble reaching that — want me to try again?") so a hung tool doesn't freeze the turn. And confirm high-stakes slots the ASR might mishear before acting. The framing — *the tool latency is a UX problem to mask, not just a backend number* — is what distinguishes someone who has shipped voice.
:::
