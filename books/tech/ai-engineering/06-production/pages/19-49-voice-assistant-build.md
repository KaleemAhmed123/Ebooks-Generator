## Flagship 7: voice assistant — build

- **Goal:** build the streaming pipeline behind a real-time voice assistant (the mock, 19-11, designed it). The engineering is *overlapping streams* under a latency budget.

:::mint
```python
async def voice_turn(audio_stream, llm, tts, send_audio):
    partial = ""
    async for chunk in asr.stream(audio_stream):        # ASR streams transcript
        partial = chunk.text
        if chunk.is_final and vad.turn_ended():         # user finished speaking
            break
    # start LLM the instant the turn ends; stream tokens straight into TTS
    async for token in llm.stream(partial):
        async for pcm in tts.stream(token):             # TTS speaks as tokens arrive
            await send_audio(pcm)                        # play immediately
```
:::

- **The pipeline overlaps three streams.** ASR emits partial transcripts as the user talks; when VAD detects the turn ended, the LLM starts; TTS speaks the first tokens while later ones generate. Chaining sequentially would triple latency and blow the ~300–500 ms budget (19-11).
- **Barge-in** is the hard part: when the user speaks mid-response, immediately cancel the in-flight LLM and TTS and listen — the cancel-on-disconnect discipline of 17-60a. Without it, the assistant talks over the user.

:::mint
```python
async def on_user_speech():          # fired by VAD during assistant playback
    llm_task.cancel()                # stop generating
    tts_task.cancel()               # stop speaking
    audio_out.flush()               # drop queued audio, listen now
```
:::

:::note
Voice is where the streaming and cancellation disciplines of Module 17 become the product. TTFT (not total latency) is the LLM's felt contribution, overlap is what fits the budget, and instant barge-in cancellation makes it feel human. A voice agent that streams and cancels correctly feels alive; one that runs stages sequentially and can't be interrupted feels like a 2010 phone tree — same models, entirely different product.
:::
