### The production rules

- **Transcription belongs on a queue.** A one hour recording takes minutes, and no request handler should hold that
- **Diarization**, labelling who spoke, is a separate feature and not every model does it. Check before promising it
- Audio is billed by duration, not by tokens, so the cost model is different from everything else in this booklet
- **Store the transcript, not only the summary.** Re-summarizing is cheap; re-transcribing is not
