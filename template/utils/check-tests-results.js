'use strict';

/**
 * Check tests results.
 *
 * @param reportPath Path to the JSON report.
 * @param expectedPassedTests Expected number of tests to pass. -1 to not check the number of passed tests.
 */
const checkTestsResults = (reportPath = '../output/json/report.json', expectedPassedTests = -1) => {
  const passedTests = parseInt(require(reportPath).state.passed, 10);
  const failedTests = parseInt(require(reportPath).state.failed, 10);
  const skippedTests = parseInt(require(reportPath).state.skipped, 10);

  console.log(`Functional tests results from ${reportPath}:`);
  console.log(` - Passed = ${passedTests}`);
  console.log(` - Failed = ${failedTests}`);
  console.log(` - Skipped = ${skippedTests}`);

  if (failedTests > 0 || skippedTests > 0) {
    console.log('[ERROR] Not all tests have passed.');
    process.exit(1);
  }

  if (expectedPassedTests >= 0 && parseInt(expectedPassedTests, 10) !== passedTests) {
    console.log(`[ERROR] Expected number of passed tests (${expectedPassedTests}) does not match actual number of passed tests (${passedTests}).`);
    process.exit(1);
  }
};

module.exports = checkTestsResults;
