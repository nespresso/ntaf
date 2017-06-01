#!/bin/bash

set -euo pipefail

cp ../test/e2e/package.json .
cp -r ../test/e2e/website .

npm install

node ./node_modules/.bin/ntaf install

cp ../test/e2e/src/features/* src/features/.
cp ../test/e2e/src/step-definitions/* src/step-definitions/.
cp ../test/e2e/src/support/business-object/* src/support/business-object/.
cp ../test/e2e/src/support/page-object/* src/support/page-object/.
cp ../test/e2e/src/support/helper/* src/support/helper/.

npm install http-server -g
http-server website &

npm run test-local -- --baseUrl='http://127.0.0.1:8080' || ( kill $! && exit 1 )

kill $!
