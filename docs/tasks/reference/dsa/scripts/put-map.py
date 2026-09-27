# Replace the first SVG on a page with a generated one.
#   python put-map.py <file.svg> [page.md]   (default page: 01-02)
import re, sys
f = sys.argv[2] if len(sys.argv) > 2 else 'books/tech/DSA/02-pattern-recognition/pages/01-02-the-54-patterns.md'
svg = open(sys.argv[1], encoding='utf8').read().strip()
s = open(f, encoding='utf8').read()
s = re.sub(r'<svg[\s\S]*?</svg>', lambda m: svg, s, count=1)
open(f, 'w', encoding='utf8').write(s)
