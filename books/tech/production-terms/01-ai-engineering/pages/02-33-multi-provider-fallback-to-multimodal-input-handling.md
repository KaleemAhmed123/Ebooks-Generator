## Multi-Provider Fallback

Failing over to another provider, another model, or a self-hosted deployment
when the primary errors, rate limits or times out. Without it you have accepted
one vendor's availability as your ceiling, usually without deciding to.

The requirement it imposes is prompt portability. A prompt tuned to one model's
quirks performs differently elsewhere, so the fallback path needs its own
evaluation and its own regular exercise. An untested fallback discovered broken
mid-outage is worse than none, because you planned around it and stopped
considering the alternatives.

**Decide what degraded means before you need it.** If every provider is
unavailable, the options are serving from cache, queueing the request, or
returning an honest error. All three are defensible. Discovering during the
incident that the real behaviour is an unhandled exception and a blank screen is
not.

## Multimodal Input Handling

Images, audio and PDFs consume tokens on a different scale from text and fail in
different ways. Budget and validate them separately.

Cost scales with pixels, not file size. Claude splits an image into 28×28-pixel
patches and charges one visual token per patch, so a 1000×1000 image costs 1,296
tokens, and a 3840×2160 screenshot costs 4,784 on the high-resolution tier
(Claude 4.7 and later) against 1,560 after downscaling on older models. A
twenty-page scanned PDF is twenty images. Downscaling to the smallest resolution
that stays legible is most of the optimisation.

Validate format, dimensions, byte size and page count at the edge.

**The error message is the whole operational difference.** "Something went
wrong" on an upload becomes a support ticket; "this PDF is password-protected"
becomes a user removing the password. One branch of code, one support queue.
