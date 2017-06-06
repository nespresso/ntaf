'use strict';

require('src/support/business-object/form-browser-commands.bo');

module.exports = function () {

  this.When(/^I search for commands$/, function () {
    return browser.searchForCommands(require('src/support/data/search.data'));
  });

  this.Then(/^I should see filled in search details$/, function () {
    return browser.seeSearchDetails();
  });

};
