'use strict';

class GenericBrowserCommands {

  constructor(genericBrowserCommandsPage, genericBrowserCommandPage, scrollAndClickPage) {
    this.genericBrowserCommandsPage = genericBrowserCommandsPage;
    this.genericBrowserCommandPage = genericBrowserCommandPage;
    this.scrollAndClickPage = scrollAndClickPage;
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

  fillInCommand() {
    return this.scrollAndClickPage.fillInCommand();
  }

  saveCommand() {
    return this.scrollAndClickPage.saveCommand();
  }

}

const genericBrowserCommands = new GenericBrowserCommands(
  require('src/support/page-object/generic-browser-commands.page'),
  require('src/support/page-object/generic-browser-command.page'),
  require('src/support/page-object/scroll-and-click.page')
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
  logger.info(`Check that the command title is equal to "${commandTitle}".`,
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

/**
 * @alias GenericBrowserCommands.fillInCommand
 * @memberOf browser
 * @method fillInCommand
 */
browser.addCommand('fillInCommand', function () {
  logger.info('Fill in command',
    {
      file: __filename,
      method: 'browser.fillInCommand',
    }
  );
  return genericBrowserCommands.fillInCommand();
});

/**
 * @alias GenericBrowserCommands.saveCommand
 * @memberOf browser
 * @method saveCommand
 */
browser.addCommand('saveCommand', function () {
  logger.info('Save command',
    {
      file: __filename,
      method: 'browser.saveCommand',
    }
  );
  return genericBrowserCommands.saveCommand();
});

module.exports = genericBrowserCommands;
