#!/bin/sh
# Publish to Cloudflare Pages, live at https://daily-stretch.juhawilppu.com
#
# The site is the repo root, so deploy/ is assembled from just the files a
# browser needs — the README and the tests stay out of the published site.
set -e
cd "$(dirname "$0")"

node rotation.test.js

rm -rf deploy
mkdir deploy
cp index.html styles.css app.js stretches.js figures.js rotation.js favicon.svg deploy/

npx wrangler pages deploy deploy --project-name=daily-stretch
