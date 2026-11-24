"""Make the public copy of Noah's CV: remove the email and phone number (and the mailto
link) from the header line, then re-center what remains. Requires pypdf.

Usage: python3 scripts/strip-cv-contact.py ~/Downloads/CV_current.pdf public/noah-okada-cv.pdf

It expects the LaTeX header "email — phone — Pasadena, CA — Google Scholar — LinkedIn".
If the header layout changes, check the output before publishing."""
import sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream, FloatObject, ArrayObject, NameObject

src, dst = sys.argv[1], sys.argv[2]
reader = PdfReader(src)
writer = PdfWriter()
writer.append(reader)
page = writer.pages[0]

cs = ContentStream(page.get_contents(), writer)
ops = cs.operations

# Locate the header line: the TJ whose first string is the email address.
idx = next(i for i, (operands, op) in enumerate(ops)
           if op == b'TJ' and operands and len(operands[0]) and '@' in str(operands[0][0]))
arr = ops[idx][0][0]
start = next(i for i, item in enumerate(arr) if isinstance(item, str) and item.startswith('Pasadena'))
removed, kept = arr[:start], arr[start:]

# Width of the removed prefix, from the font's own glyph widths.
tf = next(ops[i] for i in range(idx, -1, -1) if ops[i][1] == b'Tf')
font_name, size = tf[0][0], float(tf[0][1])
font = page['/Resources']['/Font'][font_name].get_object()
first, widths = int(font['/FirstChar']), [float(w) for w in font['/Widths']]
units = 0.0
for item in removed:
    if isinstance(item, (int, float)) or hasattr(item, 'as_numeric'):
        units -= float(item)            # TJ adjustments subtract from the advance
    else:
        raw = item.original_bytes if hasattr(item, 'original_bytes') else str(item).encode('latin-1')
        units += sum(widths[b - first] for b in raw)
removed_width = units / 1000 * size
shift = removed_width / 2
print(f'removed prefix: {[str(x) for x in removed]}')
print(f'font {font_name} size {size}; removed width {removed_width:.2f}pt; shifting line right by {shift:.2f}pt')

# Rewrite the line, start it further right, and compensate the next move so nothing below shifts.
ops[idx] = ([ArrayObject(kept)], b'TJ')
td_before = next(i for i in range(idx, -1, -1) if ops[i][1] == b'Td')
td_after = next(i for i in range(idx, len(ops)) if ops[i][1] == b'Td')
ops[td_before][0][0] = FloatObject(round(float(ops[td_before][0][0]) + shift, 3))
ops[td_after][0][0] = FloatObject(round(float(ops[td_after][0][0]) - shift, 3))
page.replace_contents(cs)

# Links: drop the mailto, move the two remaining header links with the text.
keep = ArrayObject()
for ref in page.get('/Annots', []):
    a = ref.get_object()
    uri = a.get('/A', {}).get('/URI', '')
    if str(uri).startswith('mailto:'):
        print('dropped link', uri)
        continue
    rect = [float(x) for x in a['/Rect']]
    if rect[1] > 725:  # header line
        delta = removed_width - shift
        a[NameObject('/Rect')] = ArrayObject([FloatObject(round(rect[0] - delta, 3)), FloatObject(rect[1]),
                                              FloatObject(round(rect[2] - delta, 3)), FloatObject(rect[3])])
    keep.append(ref)
page[NameObject('/Annots')] = keep

writer.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
with open(dst, 'wb') as f:
    writer.write(f)
print('wrote', dst)
