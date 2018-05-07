'use strict';

const dateFormat = require('ntaf').dateformat;
const { defineSupportCode } = require('ntaf').cucumber;

defineSupportCode(function ({ Before, After }) {

  Before(function () {
    browser.deleteCookie();
    faker.locale = browser.options.locale;
  });

  After(function (scenario) {
    if (scenario.isFailed()) {
      const errorDate = dateFormat(new Date(), 'yyyy-mm-dd-HHMMss');
      return browser.saveScreenshot(`./output/errorShots/screenshot-error-${errorDate}.png`);
    }

    return Promise.resolve();
  });

});
