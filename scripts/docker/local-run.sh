#!/bin/sh

echo "Changing directory to 'scripts'"
cd /app/scripts/db || exit 1

echo "Running migrate-mongo to process all unapplied database migrations"
migrate-mongo up || exit 1

echo "Switching back to the 'app' directory"
cd /app/ || exit 1

echo "Running server in development mode"
npm run server:dev || exit 1