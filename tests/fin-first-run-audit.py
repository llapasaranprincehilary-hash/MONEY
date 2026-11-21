from pathlib import Path
root=Path(__file__).resolve().parents[1]
app=(root/'app.js').read_text()
pet=(root/'virtual-pet/pet.js').read_text()
css=(root/'ux.css').read_text()
sw=(root/'sw.js').read_text()
checks={
 'new-user first greeting has friendly coaching language': "Hey, let's start small. Log your first income or expense" in app,
 'new-user snapshot includes first-income CTA': 'Add first income' in app,
 'new-user snapshot includes first-expense CTA': 'Log a first expense' in app,
 'dashboard coach popup suppressed for empty first-run account': "moduleId==='dashboard' && !ctx.hasIncome && !ctx.hasExpenses" in pet,
 'speech bubble redesigned as softer companion card': '.snap-say{border-radius:20px 20px 20px 8px' in css,
 'CTA styling includes focus-visible accessibility': '.snap-first-actions button:focus-visible' in css,
 'service worker shell cache bumped': 'finuity-shell-v79' in sw,
}
for name,ok in checks.items(): print(('PASS' if ok else 'FAIL')+': '+name)
if not all(checks.values()): raise SystemExit(1)
print(f'\n{len(checks)} first-run UI checks passed.')
