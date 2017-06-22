#!/bin/bash

set -euo pipefail

echo "Creating test project directory..."
rm -rf e2e-test
mkdir e2e-test
cd e2e-test
echo "Test project directory created."

echo "Copying data (package.json, website, ...) to test project..."
cp ../test/e2e/package.json .
cp ../test/e2e/check-test-results.js .
cp -r ../test/e2e/website .
echo "Data (package.json, website, ...) copied to test project."

echo "Installing test project dependencies..."
npm install
echo "Test project dependencies installed."

node ./node_modules/.bin/ntaf install

echo "Copying test scenarios to test project..."
cp ../test/e2e/src/features/* src/features/.
cp ../test/e2e/src/step-definitions/* src/step-definitions/.
cp ../test/e2e/src/support/business-object/* src/support/business-object/.
cp ../test/e2e/src/support/page-object/* src/support/page-object/.
cp ../test/e2e/src/support/helper/* src/support/helper/.
cp ../test/e2e/src/support/data/* src/support/data/.
cp ../test/e2e/conf/realm/* conf/realm/.
cp ../test/e2e/test/* test/.
echo "Test scenarios copied to test project."

echo "Running unit tests..."
npm run test-unit
echo "Unit tests run."

echo "Running unit tests with coverage..."
npm run test-unit-with-coverage
echo "Unit tests with coverage run."

echo "Starting web sever..."
npm install http-server -g
http-server website &
echo "Web server started."

echo "Running end-to-end tests on all_local realm..."
npm run test -- --realm='all_local' || ( kill $! && exit 1 )
echo "End-to-end tests run on all_local realm".

echo "Running end-to-end tests on form_local realm..."
npm run test -- --realm='form_local' || ( kill $! && exit 1 )
echo "End-to-end tests run on form_local realm".

echo "Checking end-to-end test results..."
node check-test-results || ( kill $! && exit 1 )
echo "End-to-end test results checked..."

echo "Stopping web server..."
kill $!
echo "Web server stopped..."
