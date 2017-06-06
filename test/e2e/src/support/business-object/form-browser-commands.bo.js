'use strict';

class FormBrowserCommands {

  constructor(formBrowserCommandsPage) {
    this.formBrowserCommandsPage = formBrowserCommandsPage;
  }

  searchForCommands(data) {
    return this.formBrowserCommandsPage.fillInSearchForm(data);
  }

  seeSearchDetails() {
    const _this = this;

    return _this.formBrowserCommandsPage.getCommand().should.eventually.equal('command...')
      .then(function () {
        return _this.formBrowserCommandsPage.getUseful().should.eventually.equal(true);
      })
      .then(function () {
        return _this.formBrowserCommandsPage.getNice().should.eventually.equal(false);
      })
      .then(function () {
        return _this.formBrowserCommandsPage.getType().should.eventually.equal('t2');
      })
      .then(function () {
        return _this.formBrowserCommandsPage.getDeprecatedNo().should.eventually.equal(false);
      })
      .then(function () {
        return _this.formBrowserCommandsPage.getDeprecatedYes().should.eventually.equal(true);
      });
  }

}

const formBrowserCommands = new FormBrowserCommands(
  require('src/support/page-object/form-browser-commands.page')
);

/**
 * @alias FormBrowserCommands.searchForCommands
 * @memberOf browser
 * @method searchForCommands
 */
browser.addCommand('searchForCommands', function (data) {
  logger.info('Fill in form with ' + JSON.stringify(data),
    {
      file: __filename,
      method: 'browser.searchForCommands',
    }
  );
  return formBrowserCommands.searchForCommands(data);
});

/**
 * @alias FormBrowserCommands.seeSearchDetails
 * @memberOf browser
 * @method seeSearchDetails
 */
browser.addCommand('seeSearchDetails', function () {
  logger.info('Check search details',
    {
      file: __filename,
      method: 'browser.seeSearchDetails',
    }
  );
  return formBrowserCommands.seeSearchDetails();
});

module.exports = formBrowserCommands;
