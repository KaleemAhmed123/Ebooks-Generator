# Printed page numbers from the built PDF, for map-svg.mjs.
#   python page-numbers.py dist/tech/DSA/02-pattern-recognition.pdf > page-numbers.json
# The footer number is the PDF page index + 1 (the drawn cover is page 1).
# A named destination exists only for ids something links to: p-ID anchors, and
# the chapter headings once the 01-02 map links to them.
import json, sys, pypdf
r = pypdf.PdfReader(sys.argv[1])
ids, heads = {}, {}
for k, v in r.named_destinations.items():
    name, n = k[1:], r.get_destination_page_number(v) + 1
    if name.startswith('p-'): ids[name[2:]] = n
    elif '-chapter-' in name: heads[name] = n
print(json.dumps({'ids': ids, 'heads': heads}, indent=1))
