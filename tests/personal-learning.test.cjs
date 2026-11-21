const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(new URL('../learn.js', `file://${__filename}`), 'utf8');
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function boot(state, save = () => {}) {
  const root = { _h: '', childNodes: [{}], innerHTML: '' };
  const ctx = {
    window: {}, state, today: () => '2026-11-21', save, fmt: n => `₱${n}`,
    MONTH_ORDER: monthNames, CAT_LABELS: { food: 'Food & groceries', transport: 'Transport' },
    FinIcons: { ic: () => '' },
    document: { getElementById: id => id === 'learn' ? { classList: { contains: () => true } } : id === 'learn-root' ? root : null },
    console, Date
  };
  ctx.window.window = ctx.window;
  vm.runInNewContext(source, ctx);
  return ctx.window.FinLearn;
}
const base = () => ({ expenses: [], income: [], wallets: [], loans: [], goals: [], learn: { done: {} } });
let count = 0;
function test(name, fn) { fn(); count++; console.log(`✓ ${name}`); }
test('empty account gets starter lesson, not a false savings signal', () => {
  const api = boot(base()); const lessons = api.personalLessons();
  assert.ok(lessons.some(x => x.id === 'starter'));
  assert.ok(!lessons.some(x => x.id === 'saving'));
});
test('category lesson uses a human-readable label', () => {
  const s = base(); s.expenses = [
    { date: '2026-11-20', amount: 700, cat: 'food' },
    { date: '2026-11-20', amount: 100, cat: 'transport' },
    { date: '2026-11-20', amount: 100, cat: 'food' }
  ];
  const lesson = boot(s).personalLessons().find(x => x.id === 'category');
  assert.ok(lesson.observation.startsWith('Food & groceries'));
});
test('stale expense log creates tracking challenge', () => {
  const s = base(); s.expenses = [{ date: '2026-11-15', amount: 100, cat: 'food' }];
  assert.ok(boot(s).personalLessons().some(x => x.id === 'logging'));
});
test('actual cash coverage can activate savings lesson', () => {
  const s = base(); s.expenses = [
    { date: '2026-11-20', amount: 200, cat: 'food' },
    { date: '2026-11-19', amount: 100, cat: 'transport' },
    { date: '2026-11-18', amount: 100, cat: 'food' }
  ]; s.wallets = [{ type: 'cash', balance: 2000 }];
  assert.ok(boot(s).personalLessons().some(x => x.id === 'saving'));
});
test('challenge completion is saved', () => {
  const s = base(); let saves = 0; const api = boot(s, () => saves++);
  api.finishPersonal('starter');
  assert.ok(s.learn.personalDone.starter);
  assert.equal(saves, 1);
});
console.log(`\n${count} personalized-learning tests passed.`);
