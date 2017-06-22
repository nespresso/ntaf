#!/usr/bin/env node
'use strict';

const checkResults = function (realm, expectedPassedTests) {
  const actualPassedTests = parseFloat(require(`./output-${realm}/json/report.json`).state.passed, 10);
  if (actualPassedTests !== expectedPassedTests) {
    console.log(`[ERROR] Checking results for realm '${realm}': Passed tests = ${actualPassedTests}, expected = ${expectedPassedTests}.`);
    process.exit(1);
  }
};

checkResults('all_local', 18);
checkResults('form_local', 3);
