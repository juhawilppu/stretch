/**
 * The daily-pick rule, kept separate from the app so it can be tested with
 * plain `node rotation.test.js` — no browser, no framework.
 *
 * The rule: deal all 24 stretches into a shuffled deck once per 24-day cycle
 * and take the day's position in that deck. Every stretch comes up exactly once
 * per cycle, the order differs each cycle, and the result depends only on the
 * date — so reloading the page never rerolls the day.
 */
(function (root) {
  'use strict';

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  /** Local calendar day as YYYY-MM-DD — not toISOString(), which is UTC. */
  function dayKey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function parseKey(key) {
    var p = key.split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  /** Integer index of a local calendar day, routed through UTC so DST cannot shift it. */
  function dayNumber(d) {
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }

  function addDays(d, n) {
    var c = new Date(d.getTime());
    c.setDate(c.getDate() + n);
    return c;
  }

  /** Small deterministic PRNG — same seed, same sequence, every browser. */
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /**
   * How far apart two showings of the same stretch must stay. Shuffling each
   * cycle independently is not enough on its own: the last stretch of one cycle
   * can be the first of the next, which would serve it two days running.
   */
  var SPACING = 6;

  function shuffle(deck, cycle) {
    var dealt = deck.slice();
    var rand = mulberry32(Math.imul(cycle, 2654435761));
    for (var i = dealt.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = dealt[i]; dealt[i] = dealt[j]; dealt[j] = tmp;
    }
    return dealt;
  }

  /**
   * Deal one cycle, then push anything the previous cycle showed recently out of
   * the opening days. Swap targets are taken from the middle of the deck only,
   * so a cycle's own tail is never disturbed — which is what lets the next cycle
   * read this one's tail without the whole chain having to be recomputed.
   *
   * The result: at least SPACING + 1 days between any two showings of a stretch.
   */
  function deal(deck, cycle) {
    var n = deck.length;
    var dealt = shuffle(deck, cycle);
    if (n < 3 * SPACING) return dealt;      // deck too small to space out

    var recent = Object.create(null);
    var prev = shuffle(deck, cycle - 1);
    for (var t = n - SPACING; t < n; t++) recent[prev[t].id] = true;

    for (var i = 0; i < SPACING; i++) {
      if (!recent[dealt[i].id]) continue;
      for (var j = SPACING; j < n - SPACING; j++) {
        if (recent[dealt[j].id]) continue;
        var tmp = dealt[i]; dealt[i] = dealt[j]; dealt[j] = tmp;
        break;
      }
    }
    return dealt;
  }

  function pickForDay(dayNum, deck) {
    var n = deck.length;
    var cycle = Math.floor(dayNum / n);
    var position = ((dayNum % n) + n) % n;
    return deal(deck, cycle)[position];
  }

  var api = { dayKey: dayKey, parseKey: parseKey, dayNumber: dayNumber,
              addDays: addDays, pickForDay: pickForDay };

  if (typeof module !== 'undefined') module.exports = api;
  else root.Rotation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
