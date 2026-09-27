# Move a comment that sits alone on a line onto the code line below it, inside ```ts blocks,
# when the joined line stays within WIDTH characters (the printed code box wraps near 70).
# Formatting only: no code changes.   python inline-comments.py <page.md> ...
import re, sys
WIDTH = 66
for path in sys.argv[1:]:
    text = open(path, encoding='utf8').read()
    def fix(block):
        lines = block.group(0).split('\n')
        out, i = [], 0
        while i < len(lines):
            m = re.match(r'^(\s*)// (.*)$', lines[i])
            nxt = lines[i + 1] if i + 1 < len(lines) else ''
            if (m and i > 1 and nxt.strip() and not nxt.strip().startswith(('//', '```'))
                    and '//' not in nxt and len(nxt.rstrip()) + 4 + len(m.group(2)) <= WIDTH):
                code = nxt.rstrip()
                out.append(code + ' ' * max(1, WIDTH - len(code) - len(m.group(2)) - 3) + '// ' + m.group(2))
                i += 2
                continue
            out.append(lines[i]); i += 1
        return '\n'.join(out)
    new = re.sub(r'```ts\n[\s\S]*?```', fix, text)
    if new != text:
        open(path, 'w', encoding='utf8').write(new)
        print('inlined', path)
