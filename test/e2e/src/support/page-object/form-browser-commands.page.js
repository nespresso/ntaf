'use strict';

class FormBrowserCommandsPage {

  get pageElements() {
    return {
      commandTitle: '.title',
      command: '#command',
      useful: '#useful',
      nice: '#nice',
      deprecatedYes: '#deprecatedyes',
      deprecatedNo: '#deprecatedno',
      type: '#type',
    };
  }

  fillInSearchForm(data) {
    return browser.fillInForm(this.pageElements, data);
  }

  getCommand() {
    return browser.getValue(this.pageElements.command);
  }

  getUseful() {
    return browser.isSelected(this.pageElements.useful);
  }

  getNice() {
    return browser.isSelected(this.pageElements.nice);
  }

  getDeprecatedYes() {
    return browser.isSelected(this.pageElements.deprecatedYes);
  }

  getDeprecatedNo() {
    return browser.isSelected(this.pageElements.deprecatedNo);
  }

  getType() {
    return browser.getValue(this.pageElements.type);
  }

  getSearchDetails() {
    const searchDetails = {};

    const addSearchDetailsAttribute = (attribute, element) =>
      browser
        .getValue(this.pageElements[element])
        .then(value => searchDetails[attribute] = value);

    const promises = [];
    promises.push(addSearchDetailsAttribute('command', 'command'));
    promises.push(addSearchDetailsAttribute('type', 'type'));

    return Promise.all(promises)
      .then(() => Promise.resolve(searchDetails));
  }

}

module.exports = new FormBrowserCommandsPage();
