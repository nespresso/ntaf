'user strict';

class PageSearch {

  OpenSearch()
  {
    //return browser.url('https://racodond.github.io/test-automation-website/search.html').getTitle().should.eventually.equal('My Search Page');
    return browser.url('https://racodond.github.io/test-automation-website/search.html').getTitle().should.eventually.equal('Search');
  }

  SearchWord(word){

    return browser.setValue('#query', word);
  }

  SeeResultOk(){
    return browser.isVisible('#manyresults');
  }

  SeeResultNotOk(){
    return browser.isVisible('#noresult');
  }

}

const pageSearch = new PageSearch();
//export default pageSearch;
module.exports = pageSearch;
