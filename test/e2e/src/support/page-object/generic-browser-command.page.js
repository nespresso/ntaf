'use strict';

class GenericBrowserCommandPage {

  get pageElements() {
    return {
      commandTitle: 'h1',
    };
  }

  getCommandTitle() {
    return browser.getHTML(this.pageElements.commandTitle);
  }

  waitForAllDetailsToBeDisplayed() {
    return browser.waitForAllVisible(['#t1', '#t2', '#t3']);
  }

}

module.exports = new GenericBrowserCommandPage();
