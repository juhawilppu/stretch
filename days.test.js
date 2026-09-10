/**
 * Tests for the calendar helpers and the stretch list. Run with: node days.test.js
 * No dependencies and no test framework — this is the only logic in the project
 * that is worth pinning down, and it should stay runnable with nothing installed.
 */
const assert = require('assert');
const { dayNumber, dayKey, parseKey, addDays } = require('./days.js');
const { STRETCHES } = require('./stretches.js');

let passed = 0;

function test(name, fn) {
  fn();
  passed++;
  console.log('  ok  ' + name);
}

console.log('\ndaily stretch (' + STRETCHES.length + ' stretches)\n');

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

test('a day key survives a round trip through parseKey', () => {
  let day = new Date(2026, 0, 1);
  for (let i = 0; i < 400; i++) {
    assert.strictEqual(dayKey(parseKey(dayKey(day))), dayKey(day));
    day = addDays(day, 1);
  }
});

test('every stretch has a hold length, cues and a photograph', () => {
  const fs = require('fs');
  for (const s of STRETCHES) {
    assert.ok(s.seconds >= 20 && s.seconds <= 90, s.id + ' has an odd hold length');
    assert.ok(s.steps.length >= 3, s.id + ' needs at least three cues');
    assert.ok(s.setup && s.note, s.id + ' needs a setup line and a note');
    assert.ok(s.photo && s.photo.src, s.id + ' has no photograph');
    assert.ok(fs.existsSync(s.photo.src), s.photo.src + ' is missing from the repo');
    assert.ok(/^\d+ \/ \d+$/.test(s.photo.aspect), s.id + ' has an unusable photo aspect');
  }
});

test('the stretches are distinct', () => {
  const ids = new Set(STRETCHES.map(s => s.id));
  assert.strictEqual(ids.size, STRETCHES.length, 'two stretches share an id');
});

console.log('\n' + passed + ' passing\n');
