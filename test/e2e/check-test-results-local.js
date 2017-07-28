#!/usr/bin/env node
'use strict';

const checkTestResults = require('./check-test-results');

checkTestResults('all', 'local', 'chrome', 21);
checkTestResults('all', 'local', 'firefox', 21);
checkTestResults('form', 'local', 'chrome', 3);
checkTestResults('form', 'local', 'firefox', 3);
