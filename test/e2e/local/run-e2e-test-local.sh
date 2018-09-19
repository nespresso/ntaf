#!/bin/bash

set -euo pipefail

echo "Running unit tests..."
npx ntaf test-unit
echo "Unit tests run."

#echo "Running unit tests with coverage..."
#npx ntaf test-unit-with-coverage
#echo "Unit tests with coverage run."

echo "Starting web sever..."
npm install http-server -g
http-server -p8080 website &
echo "Web server started."

echo "Running end-to-end tests on all-local-chrome realm..."
npx ntaf run --realm='all-local-chrome' || ( kill $! && exit 1 )
echo "End-to-end tests run on all-local-chrome realm."

echo "Running end-to-end tests on form-local-chrome realm..."
npx ntaf run --realm='form-local-chrome' || ( kill $! && exit 1 )
echo "End-to-end tests run on form-local-chrome realm."

echo "Running end-to-end tests on all-local-firefox realm..."
npx ntaf run --realm='all-local-firefox' || ( kill $! && exit 1 )
echo "End-to-end tests run on all-local-firefox realm."

echo "Running end-to-end tests on form-local-firefox realm..."
npx ntaf run --realm='form-local-firefox' || ( kill $! && exit 1 )
echo "End-to-end tests run on form-local-firefox realm."

echo "Running end-to-end tests on all-local-chrome-tag realm..."
npx ntaf run --realm='all-local-chrome-tag' || ( kill $! && exit 1 )
echo "End-to-end tests run on all-local-chrome-tag realm."

echo "Running end-to-end tests on form-local-chrome-tag realm..."
npx ntaf run --realm='form-local-chrome-tag' || ( kill $! && exit 1 )
echo "End-to-end tests run on form-local-chrome-tag realm."

echo "Running end-to-end tests on all-local-firefox-tag realm..."
npx ntaf run --realm='all-local-firefox-tag' || ( kill $! && exit 1 )
echo "End-to-end tests run on all-local-firefox-tag realm."

echo "Running end-to-end tests on form-local-firefox-tag realm..."
npx ntaf run --realm='form-local-firefox-tag' || ( kill $! && exit 1 )
echo "End-to-end tests run on form-local-firefox-tag realm."

echo "Checking end-to-end test results..."
node local/check-tests-results-local || ( kill $! && exit 1 )
echo "End-to-end test results checked..."

echo "Stopping web server..."
kill $!
echo "Web server stopped."
