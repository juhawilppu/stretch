#!/bin/sh
# Publish to Cloudflare Pages, live at https://daily-stretch.juhawilppu.com
#
# The site is the repo root, so deploy/ is assembled from just the files a
# browser needs — the README and the tests stay out of the published site.
set -e
cd "$(dirname "$0")"

node days.test.js

rm -rf deploy
mkdir deploy
cp index.html styles.css app.js stretches.js days.js favicon.svg deploy/
mkdir deploy/photos
cp photos/*.jpg deploy/photos/          # CREDITS.md is for the repo, not the site

# Cloudflare serves index.html with max-age=0 but everything else with a four
# hour TTL, so for four hours after a deploy a returning visitor can pair a fresh
# index.html with a stale app.js, an old stretches.js or a replaced photograph.
# That does not merely date the page, it breaks it — last time the old app.js
# reached for a Rotation global the new index.html no longer loads. Stamping the
# commit onto every asset URL makes each deploy a set that can only load together.
VERSION=$(git rev-parse --short HEAD 2>/dev/null || date +%s)

stamp() {
  sed -E "$2" "$1" > "$1.tmp" && mv "$1.tmp" "$1"
}
stamp deploy/index.html \
  "s#(href|src)=\"(favicon\.svg|styles\.css|stretches\.js|days\.js|app\.js)\"#\\1=\"\\2?v=$VERSION\"#g"
stamp deploy/stretches.js \
  "s#'(photos/[a-z0-9-]+\.jpg)'#'\\1?v=$VERSION'#g"

npx wrangler pages deploy deploy --project-name=daily-stretch
