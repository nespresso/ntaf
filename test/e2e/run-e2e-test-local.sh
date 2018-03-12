#!/bin/bash

set -euo pipefail

echo "Creating test project directory..."
rm -rf e2e-test
mkdir e2e-test
cd e2e-test
echo "Test project directory created."

echo "Copying data (package.json, website, scripts...) to test project..."
cp ../test/e2e/package.json .
cp ../test/e2e/check-test-results.js .
cp ../test/e2e/check-test-results-local.js .
cp -R ../test/e2e/website .
echo "Data (package.json, website, scripts...) copied to test project."

echo "Installing test project dependencies..."
npm install
echo "Test project dependencies installed."

echo "Generating test project canvas..."
npx ntaf install
echo "Test project canvas generated."

echo "Copying test scenarios to test project..."
cp -R ../test/e2e/src/features/* src/features/.
cp -R ../test/e2e/src/step_definitions/* src/step_definitions/.
cp -R ../test/e2e/src/support/business-object/* src/support/business-object/.
cp -R ../test/e2e/src/support/page-object/* src/support/page-object/.
cp -R ../test/e2e/src/support/helper/* src/support/helper/.
cp -R ../test/e2e/src/support/data/* src/support/data/.
cp -R ../test/e2e/conf/realm/* conf/realm/.
cp -R ../test/e2e/test/* test/.
echo "Test scenarios copied to test project."

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
node check-test-results-local || ( kill $! && exit 1 )
echo "End-to-end test results checked..."

echo "Stopping web server..."
kill $!
echo "Web server stopped."
