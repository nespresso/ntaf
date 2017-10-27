'use strict';

const dateFormat = require('dateformat');
const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ Before, After }) {

  Before(function () {
    browser.deleteCookie();
    faker.locale = browser.options.locale;
  });

  After(function (scenario) {
    // Delete cached data files
    const regexPathData = /src\/support\/data/;
    for (const key in require.cache) {
      if (require.cache[key] && key.match(regexPathData)) {
        delete require.cache[key];
      }
    }

    if (scenario.isFailed()) {
      const errorDate = dateFormat(new Date(), 'yyyy-mm-dd-HHMMss');
      return browser.saveScreenshot(`./output/errorShots/screenshot-error-${errorDate}.png`);
    }

    return Promise.resolve();
  });

});
