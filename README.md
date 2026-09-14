# Daily Stretch

One stretch a day. Not a routine — one.

A long stretching session is the kind of thing you skip. A single stretch is the
kind of thing you do, and doing it every day beats doing twenty minutes of it
once a fortnight. So this shows exactly one stretch, a photograph of it, and how
long to hold it, then counts the hold down for you and keeps the streak.

**→ [stretch.juhawilppu.com](https://stretch.juhawilppu.com/)**

## What it does

- **One stretch, and the day picks it.** The same move however often you open
  the app that day, a different one tomorrow, and all five inside a week. It is
  not a menu and there is nothing to reload your way out of.
- **Nothing to fetch.** Every move is done on bare floor with empty hands — no
  mat, no strap, no wall, no kneeling.
- **A photograph of the pose**, shown at its own shape rather than cropped.
- **A countdown timer.** One hold, counted down, a chime when it ends, and the
  screen kept awake while it runs.
- **A streak**, stored in your own browser. Nothing is sent anywhere.
- **Installs to a home screen** and runs full screen, offline — the whole app is
  five files and five photographs, and a service worker keeps a copy of all of
  them. A hallway with one bar of signal is exactly where it gets used.
- **One fixed screen.** The stretch sits lit on a stage and the page never
  scrolls: the instructions come up as a sheet, and finishing a hold takes the
  whole screen over with the streak.

## The five

| Stretch | | Hold |
|---|---|---|
| Standing forward fold | hamstrings, calves and the back of the legs | 45s |
| Seated wide-leg fold | adductors, inner thigh and groin | 45s |
| Seated butterfly | groin and the top of the inner thigh | 45s |
| Seated forward fold | hamstrings, calves and the lower back | 45s |
| Standing overhead reach | shoulders, ribs and spine | 40s |

Five, because a short list is one you actually learn — the form stops being
something you read off the screen and becomes something you know. None of them
needs a mat, a strap, a wall or anything to kneel on: fetching kit for a single
stretch is exactly the errand that turns a daily habit into a skipped one.

Between them they cover what a day at a desk and an evening on a bike shorten.
The back of the legs gets it twice over, standing and sitting, because that is
where sitting all day lands; the inner thigh gets no range at all on a bike,
where the legs only ever travel in one plane, and gets it twice — along its
length in the wide-leg fold, and at the top in the butterfly; the overhead reach
is the counter to the shape a keyboard and a set of handlebars both put you in.

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
that every stretch has cues, a sane hold length and a photograph that is actually
in the repo, and that the colour the browser chrome is handed is the colour the
page actually starts with.

## Layout

| File | |
|---|---|
| `index.html` | the single screen |
| `styles.css` | layout, light and dark themes |
| `stretches.js` | the five stretches — cues, hold lengths, why each one matters |
| `photos/` | one photograph per stretch, with credits |
| `days.js` | the calendar-day helpers, kept testable outside a browser |
| `app.js` | rendering, the timer, the streak |
| `manifest.webmanifest` | name, colours and icons for an installed app |
| `sw.js` | the service worker — caches the app so it runs offline |
| `_headers` | keeps Cloudflare from holding on to the worker and the manifest |
| `favicon.svg`, `icon-*.png` | the mark: the card with the countdown part-way round it |
| `deploy.sh` | assembles `deploy/` and publishes it to Cloudflare Pages |

## Installing it on a phone

Open the site in Safari, share sheet, **Add to Home Screen**. It then runs as its
own app: full screen, no browser chrome, and it opens with no network at all.

Two things worth knowing. An installed web app keeps its own storage, separate
from Safari's, so the streak you build in the installed app is not the streak you
see if you later open the same address in a browser tab — pick one and stay with
it. And the icon is copied at the moment you add it, so if the mark changes,
remove it and add it again.

## A reminder

Installing the app does not bring a reminder with it, and nothing the app does
can add one. A web app cannot schedule a notification for later, cannot ask iOS
to wake it, and cannot create an automation — the API for scheduled local
notifications was dropped before it shipped, and iOS only pushes to a web app
when a server sends the push. The reminder has to be made once, by hand, in
Shortcuts. It takes half a minute and then it is permanent.

**Every evening at eight.** The dependable one: a time comes every day, whether
or not you went anywhere.

1. Shortcuts → **Automation** → **＋** → **Time of Day**
2. 20:00, Daily. **Run Immediately**, and turn *Notify When Run* off.
3. Action: **Show Notification** — "Stretch. It takes forty-five seconds."

**When you get home.** Worth adding as well if the evening one catches you out,
though it is the weaker trigger: no browser has geofencing and a web app gets no
location in the background, so this is iOS's automation doing the geography.

1. Shortcuts → **Automation** → **＋** → **Arrive**
2. Location: Home. Run Immediately, *Notify When Run* off.
3. Action: **Show Notification**, same text.

Either fires whether or not the stretch is done, because nothing on the phone
can see into the app's storage to check. Making it fire only on an unmarked day
would take a server — the app reporting each finished day, the automation asking
it, a push when the answer is no — and that is the trade this app declines. The
streak is one line in one browser's storage and it has never left the phone; a
reminder that knows whether you have stretched is a reminder that knows when you
are home, kept on someone else's computer. An extra notification on a day you
have already done it is the cheaper price.

If the Shortcuts app lists the web app under **Open App**, that action works in
place of the notification and skips the tap. It is a home screen web app rather
than an installed one, so whether it appears depends on the iOS version.

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
