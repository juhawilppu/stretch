/**
 * Tests for the daily-pick rule. Run with: node rotation.test.js
 * No dependencies and no test framework — this is the only logic in the project
 * that is worth pinning down, and it should stay runnable with nothing installed.
 */
const assert = require('assert');
const rotation = require('./rotation.js');
const { dayNumber, dayKey, addDays } = rotation;
const { STRETCHES } = require('./stretches.js');

const pickForDay = day => rotation.pickForDay(day, STRETCHES);

const N = STRETCHES.length;
let passed = 0;

function test(name, fn) {
  fn();
  passed++;
  console.log('  ok  ' + name);
}

console.log('\nrotation (' + N + ' stretches)\n');

test('the same day always gives the same stretch', () => {
  for (let d = 0; d < 500; d++) {
    assert.strictEqual(pickForDay(d).id, pickForDay(d).id);
  }
});

test('the stretch changes every day', () => {
  for (let d = 0; d < 500; d++) {
    assert.notStrictEqual(pickForDay(d).id, pickForDay(d + 1).id,
      'day ' + d + ' and ' + (d + 1) + ' share a stretch');
  }
});

test('every stretch appears exactly once per cycle', () => {
  for (let cycle = 0; cycle < 40; cycle++) {
    const seen = new Set();
    for (let i = 0; i < N; i++) seen.add(pickForDay(cycle * N + i).id);
    assert.strictEqual(seen.size, N, 'cycle ' + cycle + ' dealt only ' + seen.size);
  }
});

test('the same stretch never comes back inside a week', () => {
  const lastSeen = new Map();
  for (let d = 0; d < 3000; d++) {
    const id = pickForDay(d).id;
    if (lastSeen.has(id)) {
      const gap = d - lastSeen.get(id);
      assert.ok(gap >= 7, id + ' came back after only ' + gap + ' days, at day ' + d);
    }
    lastSeen.set(id, d);
  }
});

test('consecutive cycles are dealt in a different order', () => {
  const orderOf = c => Array.from({ length: N }, (_, i) => pickForDay(c * N + i).id).join();
  for (let c = 0; c < 20; c++) {
    assert.notStrictEqual(orderOf(c), orderOf(c + 1), 'cycles ' + c + ' and ' + (c + 1) + ' match');
  }
});

test('negative day numbers still land on a real stretch', () => {
  for (let d = -60; d < 0; d++) assert.ok(pickForDay(d) && pickForDay(d).id);
});

test('calendar days map to consecutive numbers across a DST change', () => {
  // Finland springs forward 2026-03-29 and falls back 2026-10-25.
  for (const around of ['2026-03-27', '2026-10-23']) {
    const [y, m, d] = around.split('-').map(Number);
    let day = new Date(y, m - 1, d);
    for (let i = 0; i < 5; i++) {
      const next = addDays(day, 1);
      assert.strictEqual(dayNumber(next) - dayNumber(day), 1,
        'gap at ' + dayKey(day) + ' -> ' + dayKey(next));
      day = next;
    }
  }
});

test('every stretch has a hold length, cues and a figure', () => {
  const { FIGURES } = require('./figures.js');
  for (const s of STRETCHES) {
    assert.ok(s.seconds >= 20 && s.seconds <= 90, s.id + ' has an odd hold length');
    assert.ok(s.steps.length >= 3, s.id + ' needs at least three cues');
    assert.ok(FIGURES[s.id], s.id + ' has no figure');
    assert.ok(FIGURES[s.id].includes('fig-hot'), s.id + ' does not highlight a muscle');
  }
});

console.log('\n' + passed + ' passing\n');
