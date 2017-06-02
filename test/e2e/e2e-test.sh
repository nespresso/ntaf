#!/bin/bash

set -euo pipefail

echo "Creating test project directory..."
rm -rf e2e-test
mkdir e2e-test
cd e2e-test
echo "Test project directory created."

echo "Copying package.json to test project..."
cp ../test/e2e/package.json .
echo "package.json copied to test project."

echo "Copying website to test project..."
cp -r ../test/e2e/website .
echo "Website copied to test project."

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
echo "Test scenarios copied to test project."

echo "Starting web sever..."
npm install http-server -g
http-server website &
echo "Web server started."

echo "Running end-to-end tests..."
npm run test-local -- --baseUrl='http://127.0.0.1:8080' || ( kill $! && exit 1 )
echo "End-to-end tests run".

echo "Stopping web server..."
kill $!
echo "Web server stopped..."
