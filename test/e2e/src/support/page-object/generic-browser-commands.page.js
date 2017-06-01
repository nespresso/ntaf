'use strict';

class GenericBrowserCommandsPage {

  get pageElements() {
    return {
      commandTitle: '.title',
    };
  }

  clickOnFirstCommandTitleLink() {
    return browser.clickFirstElement(this.pageElements.commandTitle);
  }

  clickOnSecondCommandTitleLink() {
    return browser.clickNthElement(this.pageElements.commandTitle, 2);
  }

  clickOnLastCommandTitleLink() {
    return browser.clickLastElement(this.pageElements.commandTitle);
  }

  getNumberOfCommands() {
    return browser.getNumberOfElements(this.pageElements.commandTitle);
  }

}

module.exports = new GenericBrowserCommandsPage();
