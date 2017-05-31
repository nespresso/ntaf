'use strict';

module.exports = function () {

  this.Given(/^I am on the home page$/, function () {
    return browser
      .url('/index.html')
      .then(function () {
        return expect(browser.getTitle()).to.eventually.equal('My Home Page');
      });
  });

  this.When(/^I click on the Gherkin tutorial button$/, function () {
    return browser.click('#go-to-gherkin-tutorial');
  });

  this.Then(/^I should be on the Gherkin tutorial page$/, function () {
    return expect(browser.getTitle()).to.eventually.equal('My Gherkin Tutorial');
  });

};
