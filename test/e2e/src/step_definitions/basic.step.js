'use strict';

const urls = require('src/support/helper/urls');

const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ Given, When }) {
  Given(/^I am on the (.+) page$/, function (page) {
    return goToPage(page);
  });

  When(/^I go to the (.+) page$/, function (page) {
    return goToPage(page);
  });
});

const goToPage = function (page) {
  return browser.url('/' + urls[page]);
};
