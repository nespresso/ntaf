'use strict';

class ResultsPage {
  get pageElements() {
    return {
      query: '#query',
      noResultMessage: '#noresult',
      manyResultsMessage: '#manyresults',
    };
  }

  isNoResultDisplayed() {
    return browser.waitForVisible(this.pageElements.noResultMessage);
  }

  areManyResultsDisplayed() {
    return browser.waitForVisible(this.pageElements.manyResultsMessage);
  }

  isQueryDisplayed() {
    return browser.waitForVisible(this.pageElements.query);
  }

}

module.exports = new ResultsPage();
