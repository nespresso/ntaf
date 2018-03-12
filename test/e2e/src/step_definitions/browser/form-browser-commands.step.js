'use strict';

require('src/support/business-object/form-browser-commands.bo');

const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ When, Then }) {
  When(/^I search for commands$/, function () {
    return browser.searchForCommands(require('src/support/data/search.data'));
  });

  Then(/^I should see filled in search details$/, function () {
    return browser.seeSearchDetails();
  });
});
