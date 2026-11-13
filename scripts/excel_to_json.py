import json, openpyxl, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
wb = openpyxl.load_workbook(root / 'data' / 'data_polda_dan_polres.xlsx')

polres, polda = [], None
for no, p, pr, em in wb['Data Email Polres'].iter_rows(min_row=3, values_only=True):
    if p: polda = p.strip()
    if pr: polres.append({'polda': polda, 'polres': pr.strip(), 'email': (em or '').strip().lower()})

summary = {}
for _, p, n in wb['Ringkasan per POLDA'].iter_rows(min_row=3, values_only=True):
    if p and isinstance(n, int): summary[p.strip()] = n
total = summary.pop('TOTAL', None)

out = {'polda': sorted({r['polda'] for r in polres}), 'polres': polres, 'summary': summary, 'total': total}
(root / 'data' / 'expected.json').write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding='utf-8')
print(len(out['polda']), 'polda,', len(polres), 'polres, total sheet =', total)
