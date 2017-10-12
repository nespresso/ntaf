'use strict';

class FormBrowserCommands {

  constructor(formBrowserCommandsPage) {
    this.formBrowserCommandsPage = formBrowserCommandsPage;
  }

  searchForCommands(data) {
    return this.formBrowserCommandsPage.fillInSearchForm(data);
  }

  seeSearchDetails() {

    return Promise.all([
      expect(this.formBrowserCommandsPage.getCommand()).to.eventually.equal('command...'),
      expect(this.formBrowserCommandsPage.getUseful()).to.eventually.equal(true),
      expect(this.formBrowserCommandsPage.getNice()).to.eventually.equal(false),
      expect(this.formBrowserCommandsPage.getType()).to.eventually.equal('t2'),
      expect(this.formBrowserCommandsPage.getDeprecatedNo()).to.eventually.equal(false),
      expect(this.formBrowserCommandsPage.getDeprecatedYes()).to.eventually.equal(true),
    ]);
  }

  async seeSearchDetailsWithParamater(expectedDetails) {
    const actualDetails = await this.formBrowserCommandsPage.getSearchDetails();
    return Promise.all([
      actualDetails.command.should.equal(expectedDetails.command),
      actualDetails.type.should.equal(expectedDetails.type),
    ]);
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
