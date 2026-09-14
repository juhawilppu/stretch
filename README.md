# Daily Stretch

One stretch a day. Not a routine — one.

A long stretching session is the kind of thing you skip. A single stretch is the
kind of thing you do, and doing it every day beats doing twenty minutes of it
once a fortnight. So this shows exactly one stretch, a photograph of it, and how
long to hold it, then counts the hold down for you and keeps the streak.

**→ [daily-stretch.juhawilppu.com](https://daily-stretch.juhawilppu.com/)**

## What it does

- **One stretch, drawn at random from four.** Opening the app deals one of
  them; the list is short enough that you learn all four by heart.
- **Nothing to fetch.** Every move is done on bare floor with empty hands — no
  mat, no strap, no wall, no kneeling.
- **A photograph of the pose**, shown at its own shape rather than cropped.
- **A countdown timer.** One hold, counted down, a chime when it ends, and the
  screen kept awake while it runs.
- **A streak**, stored in your own browser. Nothing is sent anywhere.
- **One fixed screen.** The stretch sits lit on a stage and the page never
  scrolls: the instructions come up as a sheet, and finishing a hold takes the
  whole screen over with the streak.

## The four

| Stretch | | Hold |
|---|---|---|
| Standing forward fold | hamstrings, calves and the back of the legs | 45s |
| Seated wide-leg fold | adductors, inner thigh and groin | 45s |
| Seated forward fold | hamstrings, calves and the lower back | 45s |
| Standing overhead reach | shoulders, ribs and spine | 40s |

Four, because a short list is one you actually learn — the form stops being
something you read off the screen and becomes something you know. None of them
needs a mat, a strap, a wall or anything to kneel on: fetching kit for a single
stretch is exactly the errand that turns a daily habit into a skipped one.

Between them they cover what a day at a desk and an evening on a bike shorten.
The back of the legs gets it twice over, standing and sitting, because that is
where sitting all day lands; the inner thigh gets no range at all on a bike,
where the legs only ever travel in one plane; the overhead reach is the counter
to the shape a keyboard and a set of handlebars both put you in.

A day comes to forty-five seconds at most. That is the point — it has to be
small enough that you never have a good reason to skip it.

## Running it

No build step and no dependencies. Open `index.html` in a browser, or:

```sh
python3 -m http.server 8765     # then open http://localhost:8765
```

## Tests

```sh
node days.test.js
```

Covers the calendar helpers the streak is built on — that days stay consecutive
across a daylight-saving change and survive a round trip through a stored key —
and that every stretch has cues, a sane hold length and a photograph that is
actually in the repo.

## Layout

| File | |
|---|---|
| `index.html` | the single screen |
| `styles.css` | layout, light and dark themes |
| `stretches.js` | the four stretches — cues, hold lengths, why each one matters |
| `photos/` | one photograph per stretch, with credits |
| `days.js` | the calendar-day helpers, kept testable outside a browser |
| `app.js` | rendering, the timer, the streak |
| `deploy.sh` | assembles `deploy/` and publishes it to Cloudflare Pages |

## Deploying

Cloudflare Pages, direct upload — the same arrangement as `kantarelli-map`:

```sh
./deploy.sh
```

That runs the tests, assembles `deploy/` from just the files a browser needs —
the README and the tests stay off the published site — and uploads it to the
`daily-stretch` project. `deploy/` is generated, so it is gitignored rather than
committed.

Every asset URL is stamped with the commit on the way out. Cloudflare serves
`index.html` with `max-age=0` but scripts, styles and photographs with a four
hour TTL, so without the stamp a returning visitor spends four hours pairing a
fresh `index.html` with stale scripts — which breaks the page rather than merely
dating it.

Pushing to `master` does **not** publish: the project is direct-upload rather
than wired to the repo, so deploying is always an explicit `./deploy.sh`.
