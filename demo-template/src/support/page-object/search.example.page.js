'use strict';

class SearchPage {
  get pageElements() {
    return {
      queryField: '#query',
      searchButton: '#searchButton',
    };
  }

  search(query) {
    return browser
      .fillInForm(this.pageElements, { queryField: query })
      .click(this.pageElements.searchButton);
  }
}

module.exports = new SearchPage();
