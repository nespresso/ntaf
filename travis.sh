#!/bin/bash

set -euo pipefail

npm run test
npm run test-with-coverage
npm run doc
npm run e2e-test-docker

mvnCommand='sonar-scanner'
commonArgs="-Dsonar.host.url=https://sonarcloud.io -Dsonar.login=$SONAR_TOKEN -Dsonar.organization=nespresso -Dsonar.javascript.lcov.reportPaths=output/coverage/lcov.info"
githubArgs="-Dsonar.analysis.mode=preview -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST -Dsonar.github.repository=$TRAVIS_REPO_SLUG -Dsonar.github.oauth=$GITHUB_TOKEN"
branchArgs=''

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" != "master" ]; then
       branchArgs="-Dsonar.branch.name=$TRAVIS_BRANCH -Dsonar.branch.target=master"
    fi
    eval $mvnCommand $commonArgs $branchArgs
else
    eval $mvnCommand $commonArgs $githubArgs
fi
