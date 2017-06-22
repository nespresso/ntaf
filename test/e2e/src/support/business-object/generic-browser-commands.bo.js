'use strict';

class GenericBrowserCommands {

  constructor(genericBrowserCommandsPage, genericBrowserCommandPage) {
    this.genericBrowserCommandsPage = genericBrowserCommandsPage;
    this.genericBrowserCommandPage = genericBrowserCommandPage;
  }

  seeNumberOfCommands(expectedNumberOfCommands) {
    return this.genericBrowserCommandsPage.getNumberOfCommands().should.eventually.equal(parseInt(expectedNumberOfCommands, 10));
  }

  goToFirstCommand() {
    return this.genericBrowserCommandsPage.clickOnFirstCommandTitleLink();
  }

  goToSecondCommand() {
    return this.genericBrowserCommandsPage.clickOnSecondCommandTitleLink();
  }

  goToLastCommand() {
    return this.genericBrowserCommandsPage.clickOnLastCommandTitleLink();
  }

  seeCommandTitle(commandTitle) {
    return this.genericBrowserCommandPage.getCommandTitle().should.eventually.equals(commandTitle);
  }

  seeAllCommandDetails() {
    return this.genericBrowserCommandPage.waitForAllDetailsToBeDisplayed();
  }

}

const genericBrowserCommands = new GenericBrowserCommands(
  require('src/support/page-object/generic-browser-commands.page'),
  require('src/support/page-object/generic-browser-command.page')
);

/**
 * @alias GenericBrowserCommands.seeNumberOfCommands
 * @memberOf browser
 * @method seeNumberOfCommands
 */
browser.addCommand('seeNumberOfCommands', function (expectedNumberOfCommand) {
  logger.info('Check that the number of commands is equal to ' + expectedNumberOfCommand,
    {
      file: __filename,
      method: 'browser.seeNumberOfCommands',
    }
  );
  return genericBrowserCommands.seeNumberOfCommands(expectedNumberOfCommand);
});

/**
 * @alias GenericBrowserCommands.goToFirstCommand
 * @memberOf browser
 * @method goToFirstCommand
 */
browser.addCommand('goToFirstCommand', function () {
  logger.info('Click on first command title link',
    {
      file: __filename,
      method: 'browser.goToFirstCommand',
    }
  );
  return genericBrowserCommands.goToFirstCommand();
});

/**
 * @alias GenericBrowserCommands.goToSecondCommand
 * @memberOf browser
 * @method goToSecondCommand
 */
browser.addCommand('goToSecondCommand', function () {
  logger.info('Click on second command title link',
    {
      file: __filename,
      method: 'browser.goToSecondCommand',
    }
  );
  return genericBrowserCommands.goToSecondCommand();
});

/**
 * @alias GenericBrowserCommands.goToLastCommand
 * @memberOf browser
 * @method goToLastCommand
 */
browser.addCommand('goToLastCommand', function () {
  logger.info('Click on last command title link',
    {
      file: __filename,
      method: 'browser.goToLastCommand',
    }
  );
  return genericBrowserCommands.goToLastCommand();
});

/**
 * @alias GenericBrowserCommands.seeCommandTitle
 * @memberOf browser
 * @method seeCommandTitle
 */
browser.addCommand('seeCommandTitle', function (commandTitle) {
  logger.info('Check that the command title is equal to "' + commandTitle + '".',
    {
      file: __filename,
      method: 'browser.seeCommandTitle',
    }
  );
  return genericBrowserCommands.seeCommandTitle(commandTitle);
});

/**
 * @alias GenericBrowserCommands.seeAllCommandDetails
 * @memberOf browser
 * @method seeAllCommandDetails
 */
browser.addCommand('seeAllCommandDetails', function () {
  logger.info('See all 3 sections',
    {
      file: __filename,
      method: 'browser.seeAllCommandDetails',
    }
  );
  return genericBrowserCommands.seeAllCommandDetails();
});

module.exports = genericBrowserCommands;
