#!/bin/bash

set -euo pipefail

echo "Installing project dependencies..."
cd /data
npm install --no-optional
echo "Project dependencies installed."

echo "Running tests in Chrome Docker container..."
npx ntaf run --realm=docker-chrome --tagExpression='@mytest'
node docker/check-tests-results-on-chrome
echo "Tests run in Chrome Docker container."
