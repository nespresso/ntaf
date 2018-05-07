'use strict';

require('src/support/business-object/search.example.bo');

const { defineSupportCode } = require('ntaf').cucumber;

defineSupportCode(function({ Before, Given, When, Then }) {

  Given(/^I am on the search page$/, function() {
    return browser.url('');
  });

  When(/^I search for something that cannot be found$/, function() {
    return browser.search('cannot be found') ;
  });

  When(/^I search for something that can be easily found$/, function() {
    return browser.search('happiness');
  });

  When(/^I search for something$/, function() {
    return browser.search('something to find') ;
  });

  Then(/^I should see no result$/, function() {
    return browser.seeNoResults();
  });

  Then(/^I should see many results$/, function() {
    return browser.seeManyResults();
  });

  Then(/^I should see the search query$/, function() {
    return browser.seeQuery();
  });

});
