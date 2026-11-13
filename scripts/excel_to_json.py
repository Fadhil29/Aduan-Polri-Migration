import json, openpyxl, pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
wb = openpyxl.load_workbook(root / 'data' / 'data_polda_dan_polres.xlsx')

ALIAS = {
    'KEP BANGKA BELITUNG': 'KEPULAUAN BANGKA BELITUNG',
    'KEP RIAU': 'KEPULAUAN RIAU',
    'METROJAYA': 'METRO JAYA',
    'NUSA TENGGARA BARAT': 'NTB',
    'NUSA TENGGARA TIMUR': 'NTT',
}
def key(name):
    n = re.sub(r'\s+', ' ', name.strip().upper())
    n = re.sub(r'^POLDA ', '', n)
    n = n.replace('SUMATRA', 'SUMATERA')
    return ALIAS.get(n, n)

# sheet Akun Polda
akun = {}
for r in wb['Akun Polda'].iter_rows(min_row=2, values_only=True):
    if r[0]: akun[key(r[0])] = {'username': r[0].strip(), 'email': (r[1] or '').strip().lower()}

# sheet Data Email Polres (kolom POLDA di-merge: forward-fill)
polres, cur = {}, None
for _, p, pr, em in wb['Data Email Polres'].iter_rows(min_row=3, values_only=True):
    if p: cur = p.strip()
    if pr: polres.setdefault(cur, []).append({'polres': pr.strip(), 'email': (em or '').strip().lower()})

summary = {}
for _, p, n in wb['Ringkasan per POLDA'].iter_rows(min_row=3, values_only=True):
    if p and isinstance(n, int): summary[key(p)] = n
summary.pop('TOTAL', None)

out, no_account = [], []
for sheet_name, rows in polres.items():
    k = key(sheet_name)
    a = akun.get(k)
    if not a: no_account.append(sheet_name)
    out.append({
        'key': k,
        'polda': a['username'] if a else 'POLDA ' + sheet_name,
        'loginEmail': a['email'] if a else None,
        'summaryCount': summary.get(k),
        'polres': rows,
    })
no_polres = sorted(set(akun) - {key(s) for s in polres})
(root / 'data' / 'expected.json').write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding='utf-8')
print(len(out), 'polda,', sum(len(o['polres']) for o in out), 'polres')
print('tanpa akun:', no_account); print('akun tanpa polres:', no_polres)
print('count != ringkasan:', [(o['key'], len(o['polres']), o['summaryCount']) for o in out if len(o['polres']) != o['summaryCount']])
