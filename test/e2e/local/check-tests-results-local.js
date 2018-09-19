#!/usr/bin/env node
'use strict';

const checkTestsResults = require('../utils/check-tests-results');

checkTestsResults('../output-json/all-local-chrome/report.json', 21);
checkTestsResults('../output-json/all-local-firefox/report.json', 21);
checkTestsResults('../output-json/form-local-chrome/report.json', 3);
checkTestsResults('../output-json/form-local-firefox/report.json', 3);

checkTestsResults('../output-json/all-local-chrome-tag/report.json', 12);
checkTestsResults('../output-json/all-local-firefox-tag/report.json', 12);
checkTestsResults('../output-json/form-local-chrome-tag/report.json', 3);
checkTestsResults('../output-json/form-local-firefox-tag/report.json', 3);
