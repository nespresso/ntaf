#!/bin/bash

set -euo pipefail

echo "Installing project dependencies..."
cd /data
npm install --no-optional
echo "Project dependencies installed."

echo "Running tests in Firefox Docker container..."
npx ntaf run --realm=docker-firefox
node docker/check-tests-results-on-firefox
echo "Tests run in Firefox Docker container."
