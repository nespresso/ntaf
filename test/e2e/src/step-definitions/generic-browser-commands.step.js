'use strict';

require('src/support/business-object/generic-browser-commands.bo');

module.exports = function () {

  this.When(/^I go to the (first|last|second) command$/, function (command) {
    switch (command) {
      case 'first':
        return browser.goToFirstCommand();
        break;
      case 'second':
        return browser.goToSecondCommand();
        break;
      case 'last':
        return browser.goToLastCommand();
        break;
      default:
        throw new Error('Unknown command: ' + command);
    }
  });

  this.Then(/^I fill in the command$/, function () {
    return browser.fillInCommand();
  });

  this.Then(/^I save the command$/, function () {
    return browser.saveCommand();
  });

  this.Then(/^I should see (\d+) command(s)$/, function (expectedNumberOfCommands) {
    return browser.seeNumberOfCommands(expectedNumberOfCommands);
  });

  this.Then(/^I should see "(.+)" command title$/, function (commandTitle) {
    return browser.seeCommandTitle(commandTitle);
  });

  this.Then(/^I should see all sections$/, function () {
    return browser.seeAllCommandDetails();
  });

};
