## Getting the text out

- Nothing downstream can beat the quality of this step. A mangled table is mangled for every question that ever touches it
- It is also the least glamorous and most underestimated part of the pipeline

| Source | Tool | Watch for |
|---|---|---|
| Markdown, text | none needed | the easy case |
| HTML | `cheerio`, `@mozilla/readability` | navigation and footers as content |
| PDF, text layer | `pdf-parse`, `unpdf` | reading order in two columns |
| PDF, scanned | OCR, next page | everything |
| DOCX, XLSX | `mammoth`, `exceljs` | tables flattened to noise |
| Mixed, at scale | `unstructured-client`, LlamaParse | cost per page |

```ts
import { extractText, getDocumentProxy } from "unpdf"

const pdf = await getDocumentProxy(new Uint8Array(buffer))
const { text, totalPages } = await extractText(pdf, { mergePages: false })
// text is an array, one entry per page, which keeps page numbers for citations
```

### The rules

- **Keep the structure.** Headings, lists and table boundaries carry meaning that plain text throws away. Converting to Markdown preserves most of it
- **Keep the provenance.** Source id, page number, section heading and a URL, attached to every chunk. Citations later depend entirely on this
- **Look at the output.** Print the extracted text of ten real documents before building anything on top. This one habit catches most retrieval failures at the source
- Store the extracted text, not only the vectors. Re-chunking should not require re-parsing every PDF
