'use strict';

class ScrollAndClickPage {

  get pageElements() {
    return {
      command: '#command',
      save: '#save',
    };
  }

  fillInCommand() {
    return browser.fillInForm(this.pageElements, { command: 'My command...' });
  }

  saveCommand() {
    return browser.scrollAndClick(this.pageElements.save, 0, 100);
  }

}

module.exports = new ScrollAndClickPage();
