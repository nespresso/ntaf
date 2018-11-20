#!/bin/bash

set -euo pipefail

npm run test
npm run test-with-coverage
npm run doc
npm run e2e-test-docker

command='sonar-scanner'
commonArgs="-Dsonar.host.url=https://sonarcloud.io -Dsonar.login=a5f56f165037f29897f6d14377a98919a04e8a79 -Dsonar.organization=nespresso"
githubArgs="-Dsonar.analysis.mode=preview -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST -Dsonar.github.repository=$TRAVIS_REPO_SLUG -Dsonar.github.oauth=$GITHUB_TOKEN"
branchArgs=''

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" != "master" ]; then
       branchArgs="-Dsonar.branch.name=$TRAVIS_BRANCH -Dsonar.branch.target=master"
    fi
    eval $command $commonArgs $branchArgs
else
    eval $command $commonArgs $githubArgs
fi
