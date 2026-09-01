## Producing files

- Backends are asked for files far more often than they are asked for pages. Exports, invoices, reports, receipts, bulk downloads
- Building them as one string in memory works until the export is a hundred thousand rows and the container is killed
- Each format has one library worth knowing, and the common thread is that all of them can **stream**

| Need | Package | Why this one |
|---|---|---|
| Read a CSV | `csv-parse` 7 | streams, and handles quoted commas and embedded newlines correctly |
| Write a spreadsheet | `exceljs` 4.4 | real `.xlsx` with formatting, not a CSV renamed |
| Zip several files | `archiver` 8 | builds the archive as a stream, no temp files on disk |
| Create or fill a PDF | `pdf-lib` | pure JavaScript, and it can fill an existing form's fields |

```ts
import { parse } from "csv-parse"
import { pipeline } from "node:stream/promises"

await pipeline(
  createReadStream("orders.csv"),
  parse({ columns: true, skip_empty_lines: true }),
  async function* (rows) {
    for await (const row of rows) yield await importOrder(row)
  }
)
```

- Writing your own CSV parser with `split(",")` breaks on the first address containing a comma
- A spreadsheet a finance team opens should be `.xlsx`. Excel mangles a CSV's leading zeros and long numbers
- Anything large belongs on a queue, with the finished file in object storage and a link emailed out
