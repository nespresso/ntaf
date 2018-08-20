class SearchEngine {
  get pageElements() {
      return {
        searchBox: '#query',
        searchButton: '#searchButton',
        noResultsMessage: '#noresult',
        manyResultsMessage: '#manyresults',
      };
    }

  openSearchEngine(){
      return browser.url('').getTitle().should.eventually.equal('My Search Engine');
  }

 searchItem(item){
      return browser.fillInForm(this.pageElements, item)
          .click(this.pageElements.searchButton);
  }

  checkNoResults() {
      return browser.isVisible(this.pageElements.noResultsMessage);
  }

  checkManyResults() {
      return browser.isVisible(this.pageElements.manyResultsMessage);
  }
}


const searchEngine = new SearchEngine();

module.exports = searchEngine;
