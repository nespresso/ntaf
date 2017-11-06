'use strict';

function checkTestResults(tests, env, browser, expectedPassedTests, tag) {
  let reportPath = `./output-json/${tests}-${env}-${browser}`;

  if (tag !== undefined) {
    reportPath += '-' + tag;
  }

  reportPath += '/report.json';

  const actualPassedTests = parseFloat(require(reportPath).state.passed, 10);
  if (actualPassedTests !== expectedPassedTests) {
    let logMessage = `[ERROR] Checking test results for ${tests}/${env}/${browser}`;

    if (tag !== undefined) {
      logMessage += '/' + tag;
    }

    logMessage += `: Passed tests = ${actualPassedTests}, expected = ${expectedPassedTests}.`;

    console.log(logMessage);
    process.exit(1);
  }
}

module.exports = checkTestResults;
