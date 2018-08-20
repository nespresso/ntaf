'use strict';

const { defineSupportCode } = require('cucumber');
const enquirer = require('src/support/business-object/enquirer.bo');

defineSupportCode(function({ Before, Given, When, Then, After }) {

    Given(/^I am at the search page$/, function() {
        return enquirer.openSearchEngine();
    });

    When(/^I search for an item that does not exist$/, function () {
        return enquirer.searchNonexistentItem();
    });

    When(/^I search for an item that does exist$/, function () {
        return enquirer.searchExistentItem();
    });

    Then(/^I should be informed that no items are available$/, function () {
        return enquirer.seeNoResults();
    });

    Then(/^I should see some items$/, function () {
        return enquirer.seeResults();
    });

});

/*
//business
function openSearchEngine()
{
    return p_openSearchEngine();
}

function searchNonexistentItem()
{
    p_searchItem('bananas');
}

function searchExistentItem() {
    p_searchItem('happiness');
}

function seeNoResults(){
    return p_checkResults('noresult');
}

function seeResults(){
    return p_checkResults('manyresults');
}

//page
function p_openSearchEngine(){
    return browser.url('').getTitle().should.eventually.equal('My Search Engine');
}

function p_searchItem(item){
    var fieldId = {searchBox: '#query'};
    var fieldValue = {searchBox: item};
    return browser.fillInForm(fieldId, fieldValue)
        .clickFirstElement('#searchButton');
}

function p_checkResults(results) {
    return browser.isVisible('#' + results);
}
*/
