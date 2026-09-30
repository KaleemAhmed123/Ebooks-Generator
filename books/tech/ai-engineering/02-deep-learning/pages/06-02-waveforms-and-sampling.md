## Waveforms and sampling

- A **waveform** is the raw list of amplitude readings. Two numbers describe how it was captured.
- **Sample rate** — readings per second, in hertz (Hz). Speech is usually 16,000 Hz (16 kHz); music is 44,100 Hz (CD quality). Higher rate captures higher pitches.
- **Bit depth** — how finely each reading is measured. 16-bit gives 65,536 possible levels per sample, the common default.

:::mint
```python
import torchaudio
wav, sr = torchaudio.load("speech.wav")   # wav: (channels, samples)
wav = torchaudio.functional.resample(wav, sr, 16000)  # models want 16 kHz
wav.shape    # e.g. (1, 48000) -> 3 seconds of mono at 16 kHz
```
:::

- The **Nyquist rule**: a sample rate of *R* can only capture frequencies up to *R*/2. At 16 kHz you capture up to 8 kHz — plenty for speech, which lives mostly below 8 kHz.

:::warn
Sample-rate mismatch silently wrecks audio models. Feed 44.1 kHz audio to a model trained on 16 kHz and every pitch reads as three times too high — it hears chipmunks. Always resample to the rate the model expects before anything else.
:::
