/**
 * Daily Stretch
 *
 * One stretch a day, chosen by the day itself from a list of five. The streak is
 * what counts the days; the stretch itself is just whichever one the day brings.
 *
 * The screen is a fixed, non-scrolling stage with two scenes: `brief` (what
 * today's stretch is) and `run` (the countdown). Everything else — the
 * instructions, the celebration — arrives as an overlay on top of it.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'daily-stretch:v1';
  var DOT_DAYS = 14;
  var SWITCH_SECONDS = 5;

  // ------------------------------------------------------------------ dates

  var dayKey    = Days.dayKey;
  var parseKey  = Days.parseKey;
  var dayNumber = Days.dayNumber;
  var addDays   = Days.addDays;

  function formatDate(d) {
    try {
      return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
    } catch (e) {
      return dayKey(d);
    }
  }

  // ---------------------------------------------------------------- storage

  function loadState() {
    var blank = { last: null, streak: 0, longest: 0, history: [] };
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return blank;
      var s = JSON.parse(raw);
      return {
        last: typeof s.last === 'string' ? s.last : null,
        streak: Number(s.streak) || 0,
        longest: Number(s.longest) || 0,
        history: Array.isArray(s.history) ? s.history : []
      };
    } catch (e) {
      return blank;                 // private window, blocked storage, corrupt value
    }
  }

  function saveState(s) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch (e) { /* the page still works without a streak */ }
  }

  /** A streak survives one open day: done yesterday and today still to come. */
  function currentStreak(state, today) {
    if (!state.last) return 0;
    var gap = dayNumber(today) - dayNumber(parseKey(state.last));
    return (gap === 0 || gap === 1) ? state.streak : 0;
  }

  function markDone(state, today) {
    var key = dayKey(today);
    if (state.last === key) return state;
    var gap = state.last ? dayNumber(today) - dayNumber(parseKey(state.last)) : Infinity;
    state.streak = gap === 1 ? state.streak + 1 : 1;
    state.last = key;
    state.longest = Math.max(state.longest, state.streak);
    if (state.history.indexOf(key) === -1) state.history.push(key);
    state.history = state.history.slice(-90);
    return state;
  }

  // ------------------------------------------------------------------ sound

  var audio = null;

  function beep(freq, delay, duration) {
    if (!audio) return;
    var osc = audio.createOscillator();
    var gain = audio.createGain();
    var t = audio.currentTime + delay;
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  function chime(kind) {
    try {
      if (!audio) {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        audio = new Ctx();
      }
      if (audio.state === 'suspended') audio.resume();
      if (kind === 'done') { beep(660, 0, 0.16); beep(880, 0.16, 0.4); }
      else if (kind === 'rest') { beep(440, 0, 0.18); }
      else { beep(660, 0, 0.22); }
    } catch (e) { /* silence is an acceptable outcome */ }
  }

  // --------------------------------------------------------------- wake lock

  var wakeLock = null;

  function keepAwake() {
    if (!navigator.wakeLock) return;
    navigator.wakeLock.request('screen').then(function (lock) {
      wakeLock = lock;
    }, function () { /* denied or unsupported — nothing to do */ });
  }

  function releaseAwake() {
    if (wakeLock) { try { wakeLock.release(); } catch (e) {} wakeLock = null; }
  }

  // ------------------------------------------------------------------- view

  var el = {};
  ['date', 'arena', 'art', 'photo', 'area', 'name', 'hold', 'setup', 'steps',
   'note', 'sheet-area', 'sheet-name', 'dial-progress', 'dial-count',
   'dial-phase', 'start', 'mark-done', 'howto-open', 'howto-close', 'howto',
   'scrim', 'control-sep', 'reroll', 'reroll-sep', 'streak-chip', 'streak-count', 'dots', 'streak-sub', 'finale',
   'finale-kicker', 'finale-count', 'finale-word', 'finale-sub', 'finale-close'
  ].forEach(function (id) {
    el[id] = document.getElementById(id);
  });

  var ring = el['dial-progress'].parentNode;
  var RING = 0;          // the card's edge, in the units the dash is measured in
  var VIEW_H = 300;      // the ring viewBox's height for the current card shape
  var swept = 0;         // how much of the hold has gone, 0 to 1

  /* The ring is one dash as long as the whole edge, wound off as the hold runs —
     so its length has to be right, and it is not simply getTotalLength().

     The stroke is `vector-effect: non-scaling-stroke`, which keeps it 4px wide
     whatever the card's size by stroking the path *after* the SVG is scaled to
     the card. Dashes are part of the stroke, so they are measured in rendered
     pixels too, while getTotalLength() answers in the viewBox's own units. Hand
     the raw length over and the dash covers only 200/card-width of the edge —
     half of it on a 400px card — and the rest of the pattern trails round behind
     it like a snake. So measure the path, then scale it the way the card is. */
  function measureRing() {
    var box = ring.getBoundingClientRect();
    if (!box.width || !box.height) return;              // not laid out yet

    var scale = Math.min(box.width / 200, box.height / VIEW_H);   // as `meet` scales it
    RING = el['dial-progress'].getTotalLength() * scale;
    el['dial-progress'].style.strokeDasharray = RING;
    el['dial-progress'].style.strokeDashoffset = RING * swept;
  }

  /* Each photograph gets a card of its own shape rather than being cropped to a
     common one. The countdown traces that card's edge, so the ring has to be
     rebuilt to match whenever the shape changes. */
  function shapeCard(aspect) {
    el.arena.style.setProperty('--aspect', aspect);

    var parts = aspect.split('/');
    VIEW_H = 200 * (parseFloat(parts[1]) / parseFloat(parts[0]));
    ring.setAttribute('viewBox', '0 0 200 ' + VIEW_H);
    ring.querySelectorAll('rect').forEach(function (r) {
      r.setAttribute('height', VIEW_H - 4);
    });

    measureRing();
  }

  /* The card is not a fixed size: it takes what the screen leaves it, so a
     rotation, a resized window, or simply a longer stretch name wrapping onto a
     second line changes how far the ring is scaled — and with it the length the
     dash has to be. Watch the box rather than guess when it settles. */
  if (window.ResizeObserver) new ResizeObserver(measureRing).observe(ring);
  else window.addEventListener('resize', measureRing);

  function scene(name) { document.body.dataset.scene = name; }

  function today() { return new Date(); }

  /* Running from a checkout rather than the published site. The published app
     offers the day's stretch and only that, which is awkward when you want a
     particular one on screen to look at, so local runs get a Shuffle button. */
  var LOCAL = window.location.protocol === 'file:' ||
              /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(window.location.hostname);

  el.reroll.hidden = !LOCAL;
  el['reroll-sep'].hidden = !LOCAL;

  /* Chrome will hold on to a photograph it cached before the file on disk was
     replaced, and a plain reload does not always shift it — a local run can go
     on showing the old picture indefinitely. Locally, ask for a fresh copy every
     time; the published site keeps clean, cacheable URLs. */
  function photoSrc(s) {
    return LOCAL ? s.photo.src + '?v=' + Date.now() : s.photo.src;
  }

  /* The day picks the stretch, and picks the same one all day: open the app at
     noon and again at nine and it is the same move waiting. Drawing at random on
     every load made it something you could reload your way out of — one more go
     and maybe you get the short one — and turned the day's stretch into a thing
     to negotiate with. A rotation cannot be negotiated with, and it comes round
     to all five in five days rather than leaving one of them unseen for a fortnight.

     Shuffle steps on from today's move, so a local run can put any card on screen;
     the next day starts from the day again. */
  var shuffleSteps = 0;

  function stretchForDay(date) {
    return STRETCHES[(dayNumber(date) + shuffleSteps) % STRETCHES.length];
  }

  var stretch = null;

  function holdLabel(s) {
    return s.perSide ? s.seconds + 's each side' : s.seconds + ' seconds';
  }

  function renderStretch() {
    stretch = stretchForDay(today());

    el.photo.src = photoSrc(stretch);
    el.photo.alt = stretch.name;
    shapeCard(stretch.photo.aspect);

    el.area.textContent = stretch.area + ' · ' + stretch.target;
    el.name.textContent = stretch.name;
    el.hold.textContent = holdLabel(stretch);

    el['sheet-area'].textContent = stretch.area + ' · ' + stretch.target;
    el['sheet-name'].textContent = stretch.name;
    el.setup.textContent = stretch.setup;
    el.note.textContent = stretch.note;

    el.steps.innerHTML = '';
    stretch.steps.forEach(function (step) {
      var li = document.createElement('li');
      li.textContent = step;
      el.steps.appendChild(li);
    });

    document.title = stretch.name + ' · Daily Stretch';
    resetTimer();
    renderStreak();

    /* Last, once every line that can push the card around is on the page: the
       arena may shrink to make room for a two-line stretch name or a longer
       streak line, and the ring's length has to be measured against the card
       that results, not the one the layout started with. */
    measureRing();
  }

  function streakSub(state, streak, doneToday) {
    if (streak === 0) return 'Do today’s stretch and the chain begins.';
    if (!doneToday)   return 'Today is not marked yet — don’t break the chain.';
    if (state.streak >= state.longest) return 'That is your best run yet.';
    return 'Best run so far: ' + state.longest + ' days.';
  }

  var shownDay = null;

  /** Everything that depends on what day it is, so a page left open can roll over. */
  function renderStreak() {
    var now = today();
    shownDay = dayKey(now);
    el.date.textContent = formatDate(now);

    var state = loadState();
    var streak = currentStreak(state, now);
    var doneToday = state.last === dayKey(now);

    el['streak-count'].textContent = streak;
    el['streak-chip'].classList.toggle('is-live', streak > 0);
    el['streak-sub'].textContent = streakSub(state, streak, doneToday);

    el.dots.innerHTML = '';
    for (var i = DOT_DAYS - 1; i >= 0; i--) {
      var key = dayKey(addDays(now, -i));
      var dot = document.createElement('span');
      dot.className = 'dot' +
        (state.history.indexOf(key) !== -1 ? ' is-done' : '') +
        (i === 0 ? ' is-today' : '');
      el.dots.appendChild(dot);
    }

    el['mark-done'].hidden = doneToday;
    el['control-sep'].hidden = doneToday;     // no dangling separator
    if (!running) {
      el.start.textContent = doneToday ? 'Go again' : 'Start';
      el.start.classList.toggle('is-done', doneToday);
    }
  }

  /** Records today and returns true when that was a fresh completion. */
  function complete() {
    var state = loadState();
    var fresh = state.last !== dayKey(today());
    saveState(markDone(state, today()));
    renderStreak();
    return fresh;
  }

  // ------------------------------------------------------------ how-to sheet

  function openSheet() {
    el.scrim.hidden = false;
    el.howto.hidden = false;
    requestAnimationFrame(function () {
      el.scrim.classList.add('is-open');
      el.howto.classList.add('is-open');
    });
  }

  function closeSheet() {
    el.scrim.classList.remove('is-open');
    el.howto.classList.remove('is-open');
    setTimeout(function () {
      el.scrim.hidden = true;
      el.howto.hidden = true;
    }, 380);
  }

  // ---------------------------------------------------------------- finale

  function openFinale() {
    var state = loadState();
    var streak = currentStreak(state, today());
    var doneToday = state.last === dayKey(today());

    el['finale-count'].textContent = streak;
    el['finale-word'].textContent = streak === 1 ? 'day in a row' : 'days in a row';
    el['finale-kicker'].textContent = 'Held it.';
    el['finale-sub'].textContent = streakSub(state, streak, doneToday);

    el.finale.hidden = false;
    requestAnimationFrame(function () { el.finale.classList.add('is-open'); });
  }

  function closeFinale() {
    el.finale.classList.remove('is-open');
    setTimeout(function () { el.finale.hidden = true; }, 300);
  }

  // ------------------------------------------------------------------ timer

  var phases = [];
  var phaseIndex = 0;
  var deadline = 0;
  var running = false;
  var ticker = null;

  function buildPhases(s) {
    if (!s.perSide) return [{ label: 'Hold', secs: s.seconds }];
    return [
      { label: 'Left side', secs: s.seconds },
      { label: 'Switch sides', secs: SWITCH_SECONDS, rest: true },
      { label: 'Right side', secs: s.seconds }
    ];
  }

  function resetTimer() {
    running = false;
    if (ticker) { clearInterval(ticker); ticker = null; }
    releaseAwake();
    scene('brief');
    ring.classList.remove('is-rest');
    el.start.classList.remove('is-running');
    swept = 0;                  // a whole ring waiting, whatever the card does next
  }

  function startPhase(i) {
    phaseIndex = i;
    var phase = phases[i];
    deadline = Date.now() + phase.secs * 1000;
    ring.classList.toggle('is-rest', !!phase.rest);
    el['dial-phase'].textContent = phase.label;
    paint(phase.secs, phase.secs);
  }

  function paint(remaining, total) {
    el['dial-count'].textContent = Math.max(0, Math.ceil(remaining));
    swept = 1 - Math.max(0, remaining) / total;
    el['dial-progress'].style.strokeDashoffset = RING * swept;
  }

  /** Driven by a wall-clock deadline, so a backgrounded tab does not drift. */
  function tick() {
    var phase = phases[phaseIndex];
    var remaining = (deadline - Date.now()) / 1000;

    if (remaining > 0) { paint(remaining, phase.secs); return; }

    paint(0, phase.secs);
    if (phaseIndex < phases.length - 1) {
      chime(phases[phaseIndex + 1].rest ? 'rest' : 'phase');
      startPhase(phaseIndex + 1);
    } else {
      chime('done');
      resetTimer();
      complete();
      openFinale();
    }
  }

  function start() {
    chime('rest');                     // also unlocks audio on the user gesture
    phases = buildPhases(stretch);
    running = true;
    scene('run');
    el.start.textContent = 'Stop';
    el.start.classList.add('is-running');
    el.start.classList.remove('is-done');
    keepAwake();
    startPhase(0);
    ticker = setInterval(tick, 100);
  }

  function toggle() {
    if (running) { resetTimer(); renderStreak(); } else { start(); }
  }

  el.start.addEventListener('click', toggle);

  el['mark-done'].addEventListener('click', function () {
    if (complete()) openFinale();
  });

  el.reroll.addEventListener('click', function () { shuffleSteps++; renderStretch(); });

  el['howto-open'].addEventListener('click', openSheet);
  el['howto-close'].addEventListener('click', closeSheet);
  el.scrim.addEventListener('click', closeSheet);
  el['finale-close'].addEventListener('click', closeFinale);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!el.finale.hidden) closeFinale();
      else if (!el.howto.hidden) closeSheet();
      return;
    }
    // Space starts and stops, unless a button already has the focus.
    if (e.key === ' ' && el.howto.hidden && el.finale.hidden &&
        document.activeElement === document.body) {
      e.preventDefault();
      toggle();
    }
  });

  /* Midnight with the page still open: the date, the streak and the stretch all
     belong to the new day now. A hold that is running keeps the stretch it started
     with — swapping the card out from under a countdown would be unkind — and picks
     the new one up when it finishes. */
  function rollOver() {
    if (running) { renderStreak(); return; }
    shuffleSteps = 0;
    renderStretch();
  }

  // Re-acquire the screen lock after the tab comes back, and roll the day over at midnight.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') return;
    if (running) keepAwake();
    if (dayKey(today()) !== shownDay) rollOver();
  });

  setInterval(function () {
    if (!running && dayKey(today()) !== shownDay) rollOver();
  }, 60000);

  renderStretch();

  /* Installed on a phone, this runs in a hallway on one bar of signal, so it
     keeps a copy of itself. Not on a local checkout: the worker would serve the
     files you are editing from its cache and you would spend an afternoon
     wondering why a change did nothing. */
  if (!LOCAL && navigator.serviceWorker) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        /* an app that cannot cache itself still works online */
      });
    });
  }

})();
