# Rewrite one chapter in the compact style.
#   python compact.py <pagesDir> <lc-map.json> <spec.py>
# spec.py defines PAGES = [ (id, filename, title_line, top, bottom, svg_from, code_from) ]
#   top/bottom: markdown lines; {LC n} expands to a linked live title.
#   svg_from / code_from: an id whose old files supply the first diagram / first ts block
#   (None = no diagram / no code). DELETE = ids whose old files are removed.
import json, os, re, sys, glob
pages_dir, lc_path, spec_path = sys.argv[1:4]
lc = json.load(open(lc_path, encoding='utf8'))
spec = {}
exec(open(spec_path, encoding='utf8').read(), spec)

def old_text(pid):
    fs = sorted(f for f in os.listdir(pages_dir) if f.startswith(pid + '-') and not f.startswith(pid + '-0-'))  # skip NN-MM-0 intros
    return '\n'.join(open(os.path.join(pages_dir, f), encoding='utf8').read().replace('\r\n', '\n') for f in fs)

def first_svg(pid):
    m = re.search(r':::mint\n(<svg[\s\S]*?</svg>)\n:::', old_text(pid))
    if not m: raise SystemExit('no svg in ' + pid)
    return ':::mint\n' + m.group(1) + '\n:::'

def first_code(pid):
    m = re.search(r'```ts\n[\s\S]*?```', old_text(pid))
    if not m: raise SystemExit('no code in ' + pid)
    return m.group(0)

def expand(s):
    def one(m):
        n = m.group(1); q = lc[n]
        if q['p']: raise SystemExit('paid ' + n)
        return f"[{q['t']}](https://leetcode.com/problems/{q['s']}/) (LeetCode {n})"
    return re.sub(r'\{LC (\d+)\}', one, s)

out = {}
for pid, fname, title, top, bottom, svg_from, code_from in spec['PAGES']:
    parts = [title, '', '\n'.join(top)]
    if svg_from: parts += ['', first_svg(svg_from)]
    if code_from: parts += ['', first_code(code_from)]
    if bottom: parts += ['', '\n'.join(bottom)]
    out[fname] = expand('\n'.join(parts)) + '\n'

# gather everything first, then delete old files and write new ones
for pid in spec['DELETE']:
    for f in glob.glob(os.path.join(pages_dir, pid + '-*.md')):
        os.remove(f)
# SPLIT = { id: marker }: that page becomes <stem>-1.md / <stem>-2.md, cut before the marker;
# page 2 repeats the ## title with " - continued"
for pid, marker in spec.get('SPLIT', {}).items():
    fname = next(f for f in out if f.startswith(pid + '-'))
    text = out.pop(fname); cut = text.index(marker)
    title = re.search(r'^## .*$', text, re.M).group(0)
    stem = fname[:-3]
    out[stem + '-1.md'] = text[:cut].rstrip() + '\n'
    out[stem + '-2.md'] = title + ' - continued\n\n' + text[cut:]
for fname, text in out.items():
    open(os.path.join(pages_dir, fname), 'w', encoding='utf8').write(text)
print('wrote', len(out), 'files; removed ids', ' '.join(spec['DELETE']))
