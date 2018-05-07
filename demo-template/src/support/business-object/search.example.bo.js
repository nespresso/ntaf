'use strict';

class Search {

  constructor(searchPage, resultsPage) {
    this.searchPage = searchPage;
    this.resultsPage = resultsPage;
  }

  search(query) {
    return this.searchPage.search(query);
  }

  seeManyResults() {
    return this.resultsPage.areManyResultsDisplayed().should.eventually.be.true;
  }

  seeNoResults() {
    return this.resultsPage.isNoResultDisplayed().should.eventually.be.true;
  }

  seeQuery() {
    return this.resultsPage.isQueryDisplayed().should.eventually.be.true;
  }

}

const search = new Search(
  require('src/support/page-object/search.example.page'),
  require('src/support/page-object/results.example.page')
);

browser.addCommand('search', function (query) {
  logger.info(`Search for "${query}"`, {
    file: __filename,
    method: 'browser.search',
  });
  return search.search(query);
});

browser.addCommand('seeManyResults', function () {
  logger.info(`Check if many results are displayed`, {
    file: __filename,
    method: 'browser.seeManyResults',
  });
  return search.seeManyResults();
});

browser.addCommand('seeNoResults', function () {
  logger.info(`Check if no result is displayed`, {
    file: __filename,
    method: 'browser.seeNoResults',
  });
  return search.seeNoResults();
});

browser.addCommand('seeQuery', function () {
  logger.info(`Check if query is displayed`, {
    file: __filename,
    method: 'browser.seeQuery',
  });
  return search.seeQuery();
});

module.exports = search;
