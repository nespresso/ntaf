'use strict';

require('src/support/business-object/generic-browser-commands.bo');

module.exports = function () {

  this.When(/^I go to the (first|last|second) command$/, function (command) {
    switch (command) {
      case 'first':
        return browser.gotToFirstCommand();
        break;
      case 'second':
        return browser.gotToSecondCommand();
        break;
      case 'last':
        return browser.gotToLastCommand();
        break;
      default:
        throw new Error('Unknown command: ' + command);
    }
  });

  this.Then(/^I should see (\d+) command(s)/, function (expectedNumberOfCommands) {
    return browser.checkNumberOfCommands(expectedNumberOfCommands);
  });

  this.Then(/^I should see "(.+)" command title/, function (title) {
    return browser.getCommandTitle(title);
  });

  this.Then(/^I should see all sections$/, function () {
    return browser.seeAllCommandDetails();
  });

};
