# Daily Stretch

One stretch a day. Not a routine — one.

A long stretching session is the kind of thing you skip. A single stretch is the
kind of thing you do, and doing it every day beats doing twenty minutes of it
once a fortnight. So this shows exactly one stretch, a picture of it, and how
long to hold it, then counts the hold down for you and keeps the streak.

**→ [daily-stretch.juhawilppu.com](https://daily-stretch.juhawilppu.com/)**

## What it does

- **One stretch, decided by the date.** Reloading does not reroll it, and it
  changes at local midnight.
- **A drawing of the pose**, with the muscle being stretched picked out.
- **A countdown timer.** Two-sided stretches run left, a switch-sides beat, then
  right, with a chime at each change, and the screen is kept awake while it runs.
- **A streak**, stored in your own browser. Nothing is sent anywhere.
- **One fixed screen.** The stretch sits lit on a stage and the page never
  scrolls: the instructions come up as a sheet, and finishing a hold takes the
  whole screen over with the streak.

## The rotation

Twenty-four stretches, weighted toward legs and hips — half the list — because
that is the chain that takes the load both from sitting at a desk all day and
from long hours on a bike.

| | |
|---|---|
| **Legs and hips** (12) | kneeling hip-flexor lunge, couch stretch, standing quad, standing hamstring hinge, lying hamstring, figure-4 glute, wall calf, bent-knee soleus, IT band lean, seated butterfly, knee-to-wall ankle, wide-legged fold |
| **Back and torso** (6) | cat–cow, thoracic extension over a chair, lying spinal twist, child's pose with a side reach, knees to chest, standing back extension |
| **Neck, chest and arms** (6) | doorway chest, upper trap side bend, levator scapulae, overhead lat reach, wrist flexors and extensors, chin tuck |

Holds are 30–45 seconds, doubled where the stretch is per side, so a day comes to
about a minute. That is the point — it has to be small enough that you never have
a good reason to skip it.

### How the day's stretch is chosen

All 24 are shuffled into a deck once per 24-day cycle, and the day takes its
position in that deck. Every stretch comes up exactly once per cycle and the
order is different next time round. Shuffling each cycle on its own is not quite
enough — the last stretch of one cycle could be the first of the next — so the
opening days of a cycle are swapped clear of whatever the previous cycle showed
most recently. The result is at least a week between any two showings.

It depends only on the date, so there is nothing to store and every device shows
the same stretch on the same day.

## Running it

No build step and no dependencies. Open `index.html` in a browser, or:

```sh
python3 -m http.server 8765     # then open http://localhost:8765
```

Add `?date=YYYY-MM-DD` to look at another day. That is preview only — it never
touches your streak.

## Tests

```sh
node rotation.test.js
```

Covers the rotation invariants (stable per day, changes daily, one full pass per
cycle, at least a week between repeats), that calendar days stay consecutive
across a daylight-saving change, and that every stretch has cues and a figure.

## Layout

| File | |
|---|---|
| `index.html` | the single screen |
| `styles.css` | layout, light and dark themes, the figure drawing vocabulary |
| `stretches.js` | the 24 stretches — cues, hold lengths, why each one matters |
| `figures.js` | one hand-drawn SVG per stretch |
| `rotation.js` | the daily-pick rule, kept testable outside a browser |
| `app.js` | rendering, the timer, the streak |
| `deploy.sh` | assembles `deploy/` and publishes it to Cloudflare Pages |

The drawings are hand-authored SVG on a shared 200×220 grid, built from a small
set of CSS classes (`fig-limb`, `fig-torso`, `fig-hot` for the muscle under
stretch, `fig-prop` for a wall or chair). They take their colours from CSS
variables, so they follow the light and dark themes rather than being baked to
one background.

## Deploying

Cloudflare Pages, direct upload — the same arrangement as `kantarelli-map`:

```sh
./deploy.sh
```

That runs the tests, assembles `deploy/` from just the seven files a browser
needs — the README and the tests stay off the published site — and uploads it to
the `daily-stretch` project. `deploy/` is generated, so it is gitignored rather
than committed.

Pushing to `master` does **not** publish: the project is direct-upload rather
than wired to the repo, so deploying is always an explicit `./deploy.sh`.
