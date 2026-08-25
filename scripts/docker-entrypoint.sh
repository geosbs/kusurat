#!/bin/sh
set -e
mkdir -p /app/uploads/covers
node ./node_modules/prisma/build/index.js migrate deploy
node ./scripts/seed-admin.cjs
exec node server.js
