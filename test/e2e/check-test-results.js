'use strict';

function checkTestResults(tests, env, browser, expectedPassedTests) {
  const actualPassedTests = parseFloat(require(`./output-json/${tests}-${env}-${browser}/report.json`).state.passed, 10);
  if (actualPassedTests !== expectedPassedTests) {
    console.log(`[ERROR] Checking test results for ${tests}/${env}/${browser}: Passed tests = ${actualPassedTests}, expected = ${expectedPassedTests}.`);
    process.exit(1);
  }
}

module.exports = checkTestResults;
