# AI Engineering: From Scratch

## Audio and Video Processing

Processing audio and video involves handling time. Video is just an image sequence; Audio is a waveform.

### Audio (Whisper)

OpenAI's Whisper proved that if you train on 680,000 hours of noisy audio transcripts from the web, you don't need complex, hand-tuned acoustic models. 
1. The audio waveform is converted into a **Mel-Spectrogram** (a visual representation of frequencies over time).
2. The spectrogram is processed by a standard **CNN + Transformer Encoder**.
3. A **Transformer Decoder** autoregressively predicts the text transcript.

### Video Understanding

Video is incredibly heavy. A 10-second 30fps clip is 300 images. Processing every frame through a Vision Transformer would obliterate the GPU's memory.
- **Sparse Sampling:** VLMs process video by taking 1 frame every second (1 fps). For most tasks (understanding a tutorial, describing a scene), the temporal difference between frame 1 and frame 30 is negligible. 
- **Temporal Grounding:** For precise tasks (e.g., self-driving, robotics), models use a temporal attention mechanism across the sampled frames to track how objects move through time.
