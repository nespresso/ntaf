'use strict';

const urls = require('src/support/helper/urls');

module.exports = function () {

  this.Given(/^I am on the (.+) page$/, function (page) {
    return goToPage(page);
  });

  this.When(/^I go to the (.+) page$/, function (page) {
    return goToPage(page);
  });

};

function goToPage(page) {
  return browser.url('/' + urls[page]);
}
