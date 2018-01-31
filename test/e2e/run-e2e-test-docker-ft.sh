#!/bin/bash

set -euo pipefail

echo "Creating test project directory..."
cd /data
rm -rf e2e-test
mkdir e2e-test
cd e2e-test
echo "Test project directory created."

echo "Copying data (package.json, scripts, ...) to test project..."
cp ../test/e2e/package.json .
cp ../test/e2e/check-test-results.js .
cp ../test/e2e/check-test-results-docker.js .
echo "Data (package.json, scripts, ...) copied to test project."

echo "Installing test project dependencies..."
npm install
echo "Test project dependencies installed."

echo "Generating test project canvas..."
npx ntaf install
echo "Test project canvas generated."

echo "Copying test scenarios to test project..."
cp -R ../test/e2e/src/features/* src/features/.
cp -R ../test/e2e/src/step-definitions/* src/step_definitions/.
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
#npx ntaf run test-unit-with-coverage
#echo "Unit tests with coverage run."

echo "Running end-to-end tests on all-docker-chrome realm..."
npx ntaf run --realm='all-docker-chrome'
echo "End-to-end tests run on all-docker-chrome realm."

echo "Running end-to-end tests on form-docker-chrome realm..."
npx ntaf run --realm='form-docker-chrome'
echo "End-to-end tests run on form-docker-chrome realm."

echo "Running end-to-end tests on all-docker-firefox realm..."
npx ntaf run --realm='all-docker-firefox'
echo "End-to-end tests run on all-docker-firefox realm."

echo "Running end-to-end tests on form-docker-firefox realm..."
npx ntaf run --realm='form-docker-firefox'
echo "End-to-end tests run on form-docker-firefox realm."

echo "Running end-to-end tests on all-docker-chrome-tag realm..."
npx ntaf run --realm='all-docker-chrome-tag'
echo "End-to-end tests run on all-docker-chrome-tag realm."

echo "Running end-to-end tests on form-docker-chrome-tag realm..."
npx ntaf run --realm='form-docker-chrome-tag'
echo "End-to-end tests run on form-docker-chrome-tag realm."

echo "Running end-to-end tests on all-docker-firefox-tag realm..."
npx ntaf run --realm='all-docker-firefox-tag'
echo "End-to-end tests run on all-docker-firefox-tag realm."

echo "Running end-to-end tests on form-docker-firefox-tag realm..."
npx ntaf run --realm='form-docker-firefox-tag'
echo "End-to-end tests run on form-docker-firefox-tag realm."

echo "Checking end-to-end test results..."
node check-test-results-docker
echo "End-to-end test results checked."
