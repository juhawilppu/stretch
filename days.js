/**
 * Calendar-day helpers, kept separate from the app so they can be tested with
 * plain `node days.test.js` — no browser, no framework.
 *
 * The streak counts local calendar days, which is fiddlier than it looks: a day
 * has to be the day you see on the wall rather than a UTC one, and the gap
 * between two days has to stay exactly one across a daylight-saving change.
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

  var api = { dayKey: dayKey, parseKey: parseKey, dayNumber: dayNumber, addDays: addDays };

  if (typeof module !== 'undefined') module.exports = api;
  else root.Days = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
