'use strict';

const reload = require('require-reload')(require);
reload.emptyCache();
const searchEngine = require('src/support/page-object/searchEngine.page');
const positiveSearchStrings = require('src/support/data/searchEngine/positiveSearch.data');
const negativeSearchStrings = reload('src/support/data/searchEngine/negativeSearch.data');

class Enquirer {


    constructor()
    {
    }

    openSearchEngine()
    {
      console.log(faker.lorem.sentence());
        return searchEngine.openSearchEngine();
    }

    searchNonexistentItem()
    {
        return searchEngine.searchItem(negativeSearchStrings);
    }

    searchExistentItem() {
        return searchEngine.searchItem(positiveSearchStrings);
    }

    seeNoResults(){
        return searchEngine.checkNoResults();
    }

    seeResults(){
        return searchEngine.checkManyResults();
    }

}

const enquirer = new Enquirer();

module.exports = enquirer;
