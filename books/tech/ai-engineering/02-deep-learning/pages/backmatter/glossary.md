# Glossary

## Glossary

Every term introduced in this booklet, defined once, plainly.

### A – C

- **Activation function** — the nonlinear bend applied to a neuron's output; what lets stacked layers add new shape.
- **AdamW** — the Adam optimizer with correct weight decay; the default for most modern training.
- **AlexNet** — the 2012 deep CNN that won ImageNet and started the deep-learning boom.
- **Anti-spoofing** — detecting synthetic or faked audio to defend a voice system.
- **ASR (automatic speech recognition)** — turning spoken audio into text.
- **AST (Audio Spectrogram Transformer)** — a transformer that classifies audio from its spectrogram.
- **Audio language model** — a transformer that generates sound by predicting neural-codec audio tokens.
- **Audio watermarking** — hiding an inaudible, detectable mark in generated audio to flag it as synthetic.
- **Backpropagation** — computing every weight's gradient by applying the chain rule backward through the network.
- **Barge-in** — letting a user interrupt an assistant by cutting its playback the instant they speak.
- **Batch normalization** — rescaling a layer's outputs across the batch to a steady mean and spread.
- **Bit depth** — how finely each audio sample's amplitude is measured.
- **Bounding box** — a rectangle marking where an object sits in an image.
- **Causal model** — one that may use only past and present input, never future; required for streaming.
- **CLIP** — a model mapping images and text into one shared space, enabling zero-shot recognition.
- **CNN (convolutional neural network)** — a network built from convolutions, suited to grid data like images.
- **Contrastive learning** — training that pulls matching pairs together and pushes non-matching pairs apart.
- **Convolution** — sliding a small shared weight grid across an input to build a feature map.
- **Cosine decay** — a learning-rate schedule that eases the rate down a cosine curve toward zero.
- **Cross-entropy** — a classification loss that heavily punishes a confident wrong answer.
- **CTC (connectionist temporal classification)** — an ASR method that learns audio-to-text alignment using a blank symbol.
- **CutMix** — augmentation that pastes a patch of one image onto another and mixes their labels.

### D – F

- **Data augmentation** — creating new training examples by label-preserving transforms of existing data.
- **DataLoader** — the PyTorch utility that feeds a model shuffled, batched data.
- **Depth map** — an image where each pixel's value is its distance from the camera.
- **Diarization** — labelling who spoke when in a multi-speaker recording.
- **Diffusion model** — a generator that creates data by repeatedly removing noise, learned in reverse.
- **Diffusion transformer (DiT)** — a diffusion model whose denoiser is a transformer over patches.
- **Discriminator** — the GAN network that judges images as real or fake.
- **Distillation** — training a small student model to copy a large teacher model.
- **Dropout** — randomly switching off neurons during training to reduce overfitting.
- **Dying ReLU** — a neuron stuck outputting zero with no gradient, unable to recover.
- **Early stopping** — halting training at the point where validation loss is lowest.
- **Edge deployment** — running a model on-device rather than in the cloud.
- **EER (equal error rate)** — the operating point where false accepts equal false rejects.
- **EnCodec** — a neural audio codec built on SoundStream's design.
- **Encoder–decoder** — an architecture that reads input into features, then generates output from them.
- **Epoch** — one full pass over the training dataset.
- **Exploding gradients** — gradients growing uncontrollably large, sending the loss to NaN.
- **Feature map** — the grid a convolution outputs, showing where its pattern appears.
- **Fine-tuning** — continuing a pretrained model's training on a new, smaller task.
- **Flow matching** — training a generator to follow a straight path from noise to data; see rectified flow.
- **Flux** — a 2024 text-to-image model using a multimodal DiT with rectified flow.
- **Forward pass** — running input through the network to produce an output.
- **Full-duplex** — processing incoming and outgoing audio at once, so a system can listen while speaking.

### G – L

- **GAN (generative adversarial network)** — a generator and a discriminator trained against each other.
- **Gaussian splatting** — representing a 3D scene as millions of small blobs for real-time rendering.
- **GELU** — a smooth, ReLU-like activation standard inside transformers.
- **Gradient clipping** — capping the gradient's magnitude at a ceiling to stop exploding gradients; standard for recurrent networks.
- **Generator** — the GAN network that turns noise into fake data.
- **Genie** — DeepMind's line of interactive world models that generate playable environments.
- **Hibiki** — Kyutai's real-time speech-to-speech translation model.
- **Hidden layer** — a layer between the input and the output.
- **Identity switch** — a tracking error where two objects' IDs get swapped.
- **ImageNet** — a 1.2-million-image, 1,000-class benchmark that drove CNN progress.
- **Inductive bias** — a model's built-in assumptions that help it learn from less data.
- **Inner monologue** — Moshi's trick of predicting its own text alongside its audio to improve output.
- **Instance segmentation** — labelling pixels per individual object, separating same-class instances.
- **JAX** — a framework treating a model as a pure function transformed by grad, jit, vmap, and pmap.
- **jit** — the JAX transform that compiles a function to fast fused device code.
- **Kaiming (He) initialization** — weight initialization scaled for ReLU layers.
- **Kernel (filter)** — the small weight grid slid across an input in a convolution.
- **Latent diffusion** — running diffusion in a compressed latent space instead of on raw pixels.
- **Layer norm** — normalising across features within one example; independent of batch size.
- **Learning rate** — the step size of each weight update.
- **Learning-rate schedule** — a rule that changes the learning rate over training.
- **LeNet** — the 1998 CNN that established the conv → pool → dense recipe.
- **Logits** — a model's raw, un-normalised scores before softmax.
- **Loss** — a single number measuring how wrong a prediction is.

### M – R

- **mAP (mean Average Precision)** — the standard detection metric combining label and box quality.
- **Mask R-CNN** — a classic instance-segmentation model: detect boxes, then mask each object.
- **Masked image modelling** — self-supervised training that hides image patches and predicts them back.
- **Mel spectrogram** — a spectrogram with its frequency axis warped to match human hearing.
- **Metric learning** — training embeddings so that distance reflects similarity.
- **Mimi** — the streaming neural audio codec inside Moshi.
- **Mixup** — augmentation that blends two images and their labels.
- **MLP (multi-layer perceptron)** — a network of stacked fully-connected layers.
- **MMDiT (multimodal diffusion transformer)** — a DiT processing image and text tokens together.
- **Monocular depth** — estimating depth from a single image.
- **MOS (mean opinion score)** — a human 1–5 rating of audio naturalness.
- **Moshi** — Kyutai's full-duplex speech-text dialogue model.
- **MSE (mean squared error)** — a regression loss: the average squared error.
- **MusicGen / MusicLM** — landmark text-to-music generation models.
- **NeRF (neural radiance field)** — a network encoding a 3D scene for rendering new viewpoints.
- **Neural audio codec** — a network compressing sound into discrete tokens and rebuilding it.
- **NMS (non-max suppression)** — removing overlapping duplicate detection boxes.
- **nn.Module** — the PyTorch base class for building models.
- **Nonlinearity** — a non-straight-line function; what makes network depth useful.
- **Nyquist rule** — a sample rate captures frequencies only up to half its value.
- **Object detection** — finding what objects are in an image and where, as boxes.
- **OCR (optical character recognition)** — converting images of text into machine-readable characters.
- **Optimizer** — the rule that turns gradients into weight updates.
- **Overfitting** — fitting training data so closely that performance on new data drops.
- **Patch embedding** — a flattened image patch projected into a vector for a vision transformer.
- **Perceptron** — a single neuron; the simplest neural network.
- **Pooling** — a fixed downsampling that shrinks feature maps, e.g. max pooling.
- **Projector** — the small network mapping image features into an LLM's token space in a VLM.
- **Pruning** — deleting low-importance weights to shrink a model.
- **PyTorch** — the dominant deep-learning framework.
- **Quantization** — storing weights or activations at lower precision (e.g. 8-bit) to shrink and speed a model.
- **Receptive field** — how much of the input one output value can see.
- **Rectified flow** — training a generator to follow near-straight noise-to-data paths, needing fewer steps.
- **ReLU** — the activation returning max(0, x).
- **Residual connection** — adding a layer's input to its output; lets very deep networks train.
- **ResNet** — the 2015 architecture that made very deep networks trainable via residual connections.
- **RVQ (residual vector quantization)** — quantising a signal in stacked layers, each refining the last's error.

### S – Z

- **SAM (Segment Anything Model)** — Meta's promptable segmentation foundation model; SAM 3 (2025) adds concept segmentation.
- **Sample rate** — audio readings taken per second, in hertz.
- **Self-supervised learning (SSL)** — learning from unlabelled data via a task invented from the data itself.
- **Semantic segmentation** — labelling every pixel of an image with a class.
- **Sequence-to-sequence** — reading an input sequence and generating an output sequence.
- **Sigmoid** — an activation squashing values into the range (0, 1).
- **Skip connection** — a shortcut carrying signal past layers; see residual connection.
- **Softmax** — turning raw scores into probabilities that sum to 1.
- **SoundStream** — the 2021 codec that introduced residual vector quantization for audio.
- **SpecAugment** — masking bands of a spectrogram as an audio augmentation.
- **Speaker embedding** — a vector capturing a voice's identity.
- **Speaker recognition** — identifying or verifying who is speaking.
- **Spectrogram** — an image of a sound's frequencies over time.
- **Stable Diffusion** — a latent diffusion text-to-image model.
- **Stride** — how far a kernel jumps between positions; a stride above 1 shrinks the output.
- **Tanh** — an activation squashing values into (−1, 1), centred on zero.
- **Tensor** — an n-dimensional array; the core data type of deep learning, able to live on a GPU.
- **Text-to-speech (TTS)** — generating speech audio from text.
- **Tracking-by-detection** — following objects by detecting each frame, then linking detections across frames.
- **Transfer learning** — reusing a pretrained model's learned features on a new task.
- **Triplet loss** — a metric-learning loss using an anchor, a positive, and a negative example.
- **Turn-taking** — deciding when a speaker has finished so a system can reply.
- **U-Net** — an encoder–decoder with skip connections that produces full-resolution outputs.
- **Universal approximation theorem** — one hidden layer of enough neurons can approximate any continuous function.
- **VAD (voice activity detection)** — detecting whether speech is present right now.
- **Validation loss** — loss measured on held-out data, used to catch overfitting.
- **Vanishing gradients** — gradients shrinking toward zero over depth, stalling learning.
- **ViT (vision transformer)** — a transformer that works on image patches instead of convolutions.
- **VLM (vision-language model)** — a model that takes an image and text and replies in text.
- **vmap** — the JAX transform that auto-vectorises a function over a batch.
- **Vocoder** — the text-to-speech stage that turns a spectrogram into a playable waveform.
- **Voice cloning** — text-to-speech that mimics a specific person's voice from a short reference.
- **Warmup** — ramping the learning rate up from near zero early in training.
- **Waveform** — the raw list of audio amplitude samples.
- **Weight** — a tunable number that scales an input inside a network.
- **Weight decay** — a penalty on large weights that reduces overfitting.
- **Weight initialization** — setting the starting weight values before training.
- **WER (word error rate)** — the ASR metric: the fraction of words wrong.
- **Whisper** — OpenAI's encoder–decoder ASR model, trained on 680,000 hours of audio.
- **World model** — a model that predicts an environment's next state, for planning or interaction.
- **Xavier (Glorot) initialization** — weight initialization scaled for tanh or sigmoid layers.
- **XOR** — the classic non-linearly-separable problem a single perceptron cannot solve.
- **Zero-shot** — performing a task with no task-specific training examples.
