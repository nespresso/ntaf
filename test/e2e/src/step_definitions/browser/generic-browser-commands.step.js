'use strict';

require('src/support/business-object/generic-browser-commands.bo');

const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ When, Then }) {
  When(/^I go to the (first|last|second) command$/, function (command) {
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

  Then(/^I fill in the command$/, function () {
    return browser.fillInCommand();
  });

  Then(/^I save the command$/, function () {
    return browser.saveCommand();
  });

  Then(/^I should see (\d+) command(s)$/, function (expectedNumberOfCommands, optionalS) {
    return browser.seeNumberOfCommands(expectedNumberOfCommands);
  });

  Then(/^I should see "(.+)" command title$/, function (commandTitle) {
    return browser.seeCommandTitle(commandTitle);
  });

  Then(/^I should see all sections$/, function () {
    return browser.seeAllCommandDetails();
  });
});
