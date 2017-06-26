'use strict';

const urls = require('src/support/helper/urls');

const goToPage = function (page) {
  return browser.url('/' + urls[page]);
};

module.exports = function () {

  this.Given(/^I am on the (.+) page$/, function (page) {
    return goToPage(page);
  });

  this.When(/^I go to the (.+) page$/, function (page) {
    return goToPage(page);
  });

};
