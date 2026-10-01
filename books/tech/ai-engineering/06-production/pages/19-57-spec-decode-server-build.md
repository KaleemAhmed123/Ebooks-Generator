## Flagship 11: speculative decoding server — build

- **Goal:** build the core of a speculative-decoding server (Module 17) — a draft model proposes tokens, the target verifies them in one pass, accepting the longest correct prefix. Lossless, and it exposes *why* the speedup depends on acceptance (17-38a).

:::mint
```python
@torch.no_grad()
def speculative_step(target, draft, ids, k=4):
    d = ids                                               # 1) draft k tokens cheaply
    for _ in range(k):
        d = torch.cat([d, draft(d)[:, -1].argmax(-1, keepdim=True)], dim=1)
    proposed = d[:, ids.size(1):]                         # the k proposals
    target_ids = target(d)[:, ids.size(1)-1:-1].argmax(-1)  # 2) verify ALL in ONE pass
    n = 0                                                 # 3) longest matching prefix
    for i in range(k):
        if proposed[0, i] == target_ids[0, i]: n += 1
        else: break
    return torch.cat([ids, target_ids[:, :n+1]], dim=1), n  # +1 = the correction
```
:::

- **One target pass, up to k+1 tokens of progress.** The draft runs k cheap forward passes; the target runs *one* pass over all k proposals plus the current position, and you keep every token that matches what the target would have produced, plus one correction. Output is *identical* to the target alone — that is the lossless guarantee.
- **Acceptance drives everything** (17-38a). High agreement between draft and target → most proposals accepted → big speedup. The draft's job is to match the target cheaply; EAGLE-3 (17-38) does it by drafting from the target's own features.

:::note
Building this makes the serving lever concrete: the speedup is *tokens accepted per target pass* divided by the drafting overhead, and it evaporates when acceptance is low (unpredictable text) or when the target is already compute-saturated (max batch, no spare compute to draft with). Production engines (vLLM, TensorRT-LLM) implement this with tree-based drafts and batching, but the accept-the-longest-matching-prefix logic here *is* the mechanism. Seeing it in ~20 lines demystifies "2–3× faster, lossless."
:::
