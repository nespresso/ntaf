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

echo "Installing test project dependencies..."
npm install --no-optional
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
cp -R ../test/e2e/docker/* docker/.
echo "Test scenarios copied to test project."

echo "Copying data (website, scripts...) to test project..."
cp -R ../test/e2e/local .
cp -R ../test/e2e/docker .
cp -R ../test/e2e/website .
echo "Data (website, scripts...) copied to test project."
