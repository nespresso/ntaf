#!/bin/bash

set -euo pipefail

if id "testrunner" >/dev/null 2>&1; then
  echo "User 'testrunner' already exists."
else
  echo "Creating user 'testrunner'..."
  useradd -u $RUN_AS_UID -o -m -p $(echo testrunner | openssl passwd -1 -stdin) testrunner
  echo "User 'testrunner' created."
fi

su testrunner -c "/data/e2e-test/docker/$1"
