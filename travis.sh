#!/bin/bash

set -euo pipefail

  node ./node_modules/.bin/grunt test
  node ./node_modules/.bin/grunt test-with-coverage

if [ "$TRAVIS_PULL_REQUEST" != "false" ] && [ "$TRAVIS_NODE_VERSION" == "6" ]; then
  sonar-scanner -Dsonar.host.url=https://sonarqube.com \
                -Dsonar.analysis.mode=preview \
                -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST \
                -Dsonar.github.repository=$TRAVIS_REPO_SLUG \
                -Dsonar.github.oauth=$GITHUB_TOKEN \
                -Dsonar.login=$SONARQUBE_TOKEN

elif [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_NODE_VERSION" == "6" ]; then
  sonar-scanner -Dsonar.host.url=https://sonarqube.com \
                -Dsonar.login=$SONARQUBE_TOKEN \
                -Dsonar.javascript.lcov.reportPaths=output/coverage/lcov.info
fi
