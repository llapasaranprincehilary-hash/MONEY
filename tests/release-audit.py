from pathlib import Path
import re, sys
from bs4 import BeautifulSoup
import tinycss2
ROOT = Path(__file__).resolve().parents[1]
errors = []
# Local references across all HTML pages
html_files = list(ROOT.rglob('*.html'))
for html_file in html_files:
    page = BeautifulSoup(html_file.read_text(errors='ignore'), 'html.parser')
    for tag, attr in [('script','src'),('link','href'),('img','src')]:
        for el in page.find_all(tag):
            val = el.get(attr)
            if not val or val.startswith(('http://','https://','data:','#','javascript:')): continue
            path = val.split('?')[0]
            if not (html_file.parent/path).exists(): errors.append(f'Missing local HTML asset in {html_file.relative_to(ROOT)}: {path}')
# Duplicate IDs in primary application page
soup = BeautifulSoup((ROOT/'index.html').read_text(errors='ignore'), 'html.parser')
ids = [el.get('id') for el in soup.find_all(id=True)]
# Duplicate HTML ids
ids = [el.get('id') for el in soup.find_all(id=True)]
for key in set(ids):
    if ids.count(key) > 1: errors.append(f'Duplicate HTML id: {key} ({ids.count(key)}x)')
# CSS parser
for css in ROOT.rglob('*.css'):
    for token in tinycss2.parse_stylesheet(css.read_text(errors='ignore'), skip_whitespace=True, skip_comments=True):
        if token.type == 'error': errors.append(f'{css}: CSS parse error line {token.source_line}: {token.message}')
# Service worker local shell entries
sw = (ROOT/'sw.js').read_text(errors='ignore')
try: shell = sw.split('const APP_SHELL',1)[1].split('];',1)[0]
except IndexError: errors.append('Service worker APP_SHELL block not found'); shell=''
assets = re.findall(r"['\"](\./[^'\"]+)['\"]", shell)
for item in assets:
    if item.startswith('https://'): continue
    if not (ROOT/item.removeprefix('./')).exists(): errors.append(f'Missing service-worker asset: {item}')
if errors:
    print('RELEASE AUDIT FAILED')
    for e in errors: print(' -',e)
    sys.exit(1)
print(f'PASS: local references across {len(html_files)} HTML pages, {len(ids)} unique IDs in index.html, CSS syntax, {len(assets)} precache assets.')
