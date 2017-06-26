'use strict';

const hooks = function () {
  this.Before(function () {
    browser.deleteCookie();
    faker.locale = browser.options.locale;
  });

  this.After(function (scenario, callback) {
    // Delete cached data files
    const regexPathData = /src\/support\/data/;
    for (const key in require.cache) {
      if (require.cache.hasOwnProperty(key) && key.match(regexPathData)) {
        delete require.cache[key];
      }
    }

    if (scenario.isFailed()) {
      const date = new Date();
      const errorDate = `${date.getYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
      browser.saveScreenshot(`./output/errorShots/screenshot-error-${errorDate}.png`);
      callback();
    } else {
      callback();
    }
  });
};

module.exports = hooks;
