'use strict';

class GenericBrowserCommands {

  constructor(genericBrowserCommandsPage, genericBrowserCommandPage) {
    this.genericBrowserCommandsPage = genericBrowserCommandsPage;
    this.genericBrowserCommandPage = genericBrowserCommandPage;
  }

  checkNumberOfCommands(expectedNumberOfCommands) {
    return expect(this.genericBrowserCommandsPage.getNumberOfCommands()).to.eventually.equal(parseInt(expectedNumberOfCommands, 10));
  }

  gotToFirstCommand() {
    return this.genericBrowserCommandsPage.clickOnFirstCommandTitleLink();
  }

  gotToSecondCommand() {
    return this.genericBrowserCommandsPage.clickOnSecondCommandTitleLink();
  }

  gotToLastCommand() {
    return this.genericBrowserCommandsPage.clickOnLastCommandTitleLink();
  }

  getCommandTitle() {
    return this.genericBrowserCommandPage.getCommandTitle();
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
 * @alias GenericBrowserCommands.checkNumberOfCommands
 * @memberOf browser
 * @method checkNumberOfCommands
 */
browser.addCommand('checkNumberOfCommands', function (expectedNumberOfCommand) {
  logger.info('Check that the number of commands is equal to ' + expectedNumberOfCommand,
    {
      file: __filename,
      method: 'browser.checkNumberOfCommands',
    }
  );
  return genericBrowserCommands.checkNumberOfCommands(expectedNumberOfCommand);
});

/**
 * @alias GenericBrowserCommands.gotToFirstCommand
 * @memberOf browser
 * @method gotToFirstCommand
 */
browser.addCommand('gotToFirstCommand', function () {
  logger.info('Click on first command title link',
    {
      file: __filename,
      method: 'browser.gotToFirstCommand',
    }
  );
  return genericBrowserCommands.gotToFirstCommand();
});

/**
 * @alias GenericBrowserCommands.gotToSecondCommand
 * @memberOf browser
 * @method gotToSecondCommand
 */
browser.addCommand('gotToSecondCommand', function () {
  logger.info('Click on second command title link',
    {
      file: __filename,
      method: 'browser.gotToSecondCommand',
    }
  );
  return genericBrowserCommands.gotToSecondCommand();
});

/**
 * @alias GenericBrowserCommands.gotToLastCommand
 * @memberOf browser
 * @method gotToLastCommand
 */
browser.addCommand('gotToLastCommand', function () {
  logger.info('Click on last command title link',
    {
      file: __filename,
      method: 'browser.gotToLastCommand',
    }
  );
  return genericBrowserCommands.gotToLastCommand();
});

/**
 * @alias GenericBrowserCommands.getCommandTitle
 * @memberOf browser
 * @method getCommandTitle
 */
browser.addCommand('getCommandTitle', function () {
  logger.info('Get the command title from h1',
    {
      file: __filename,
      method: 'browser.getCommandTitle',
    }
  );
  return genericBrowserCommands.getCommandTitle();
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
