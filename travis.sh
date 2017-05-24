#!/bin/bash

set -euo pipefail

echo
if [ "$TRAVIS_PULL_REQUEST" != "false" ] && [ "$TRAVIS_NODE_VERSION" == "4" ]; then
  node --harmony_rest_parameters ./node_modules/.bin/grunt test
  node --harmony_rest_parameters ./node_modules/.bin/grunt test-with-coverage
else
  node ./node_modules/.bin/grunt test
  node ./node_modules/.bin/grunt test-with-coverage
fi

if [ "$TRAVIS_PULL_REQUEST" != "false" ] && [ "$TRAVIS_NODE_VERSION" == "4" ]; then
  sonar-scanner -Dsonar.host.url=https://sonarqube.com \
                -Dsonar.analysis.mode=preview \
                -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST \
                -Dsonar.github.repository=$TRAVIS_REPO_SLUG \
                -Dsonar.github.oauth=$GITHUB_TOKEN \
                -Dsonar.login=$SONARQUBE_TOKEN

elif [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_NODE_VERSION" == "4" ]; then
  sonar-scanner -Dsonar.host.url=https://sonarqube.com -Dsonar.login=$SONARQUBE_TOKEN
fi
