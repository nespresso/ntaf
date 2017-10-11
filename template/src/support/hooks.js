'use strict';

const dateFormat = require('dateformat');

const hooks = function () {
  this.Before(function () {
    browser.deleteCookie();
    faker.locale = browser.options.locale;
  });

  this.After(function (scenario, callback) {
    // Delete cached data files
    const regexPathData = /src\/support\/data/;
    for (const key in require.cache) {
      if (require.cache[key] && key.match(regexPathData)) {
        delete require.cache[key];
      }
    }

    if (scenario.isFailed()) {
      const errorDate = dateFormat(new Date(), 'yyyy-mm-dd-HHMMss');
      browser.saveScreenshot(`./output/errorShots/screenshot-error-${errorDate}.png`);
      callback();
    } else {
      callback();
    }
  });
};

module.exports = hooks;
