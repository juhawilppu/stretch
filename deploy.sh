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

npx wrangler pages deploy deploy --project-name=daily-stretch
