#!/bin/bash

set -euo pipefail

cd /data/e2e-test

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
node docker/check-tests-results-docker
echo "End-to-end test results checked."
