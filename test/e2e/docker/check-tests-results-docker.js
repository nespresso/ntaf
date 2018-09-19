#!/usr/bin/env node
'use strict';

const checkTestsResults = require('../utils/check-tests-results');

checkTestsResults('../output-json/all-docker-chrome/report.json', 21);
checkTestsResults('../output-json/all-docker-firefox/report.json', 21);
checkTestsResults('../output-json/form-docker-chrome/report.json', 3);
checkTestsResults('../output-json/form-docker-firefox/report.json', 3);

checkTestsResults('../output-json/all-docker-chrome-tag/report.json', 12);
checkTestsResults('../output-json/all-docker-firefox-tag/report.json', 12);
checkTestsResults('../output-json/form-docker-chrome-tag/report.json', 3);
checkTestsResults('../output-json/form-docker-firefox-tag/report.json', 3);
