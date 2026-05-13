#!/bin/sh
set -e

DB="${DATABASE_PATH:-/app/data/app.db}"
if [ -f "$DB" ]; then
  cp "$DB" "${DB}.bak-$(date +%s)" || true
fi

exec node ./build/index.js
