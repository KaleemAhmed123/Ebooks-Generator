## Multimodal Input Handling

Images, audio and PDFs consume tokens on a very different scale from text, and
fail in different ways. Budget and validate them separately.

A single high-resolution image can cost as much as several pages of text.
Downscaling to the minimum resolution that stays legible cut image spend
substantially.

### How it works

Token cost for images scales with resolution, not with file size, and the
relationship is not obvious from looking at the file.

Images are divided into tiles and charged accordingly. **A twenty-page scanned
PDF is not one request — it is twenty images**, and it has to be budgeted as
twenty.

The most effective optimisation is downscaling to the smallest resolution at
which the content is still readable. Sending a 4000-pixel photograph of a
receipt when 1200 pixels reads perfectly is paying several times over for
nothing at all.

Validate at the edge: format, dimensions, file size and page count, before
anything reaches a model. A user uploading a 300-page PDF should get a clear
rejection, not a large bill and a timeout.

### In practice

**Failure modes differ from text in ways a text pipeline never encounters.** A
corrupt image, an unsupported codec, a password-protected PDF — each needs a
specific, comprehensible error.

"Something went wrong" on a file upload becomes a support ticket. "This PDF is
password-protected" becomes a user removing the password and trying again. The
engineering difference is one branch; the operational difference is an entire
support queue.
