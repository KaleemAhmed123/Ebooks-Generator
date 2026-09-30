## Python, and why it won

- **Python** is the language of AI. Not because it is fast — it is slow — but because the heavy work is done by libraries written in C, CUDA, and Rust, with Python as the friendly controller on top.
- You write a few readable lines; underneath, NumPy and PyTorch dispatch the real computation to optimized native code and the GPU.

### Which version

- Use the **latest stable minor release minus one** for real work. As of September 2026 the newest stable is **Python 3.14**, so 3.13 or 3.14 are both safe choices.
- Avoid the brand-new release for a month or two: key libraries (PyTorch, NumPy) need time to publish compatible builds.
- Never build on your operating system's built-in Python — it is there for the OS, and changing it can break your system.

:::mint
```bash
python --version        # check what you have
# Python 3.14.7
```
:::

:::note
"Python is slow" is true and irrelevant. In a training loop, 99% of the time is spent inside C/CUDA library calls; the Python around them is a rounding error. You get C speed with Python ergonomics — the reason the whole field standardized on it.
:::
