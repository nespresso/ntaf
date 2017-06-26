'use strict';

const formBrowserCommandsBO = require('../src/support/business-object/form-browser-commands.bo');

describe('Form browser commands business object', function () {

  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should check the search details', function () {
    const stubGetSeachDetails = sandbox.stub(
      formBrowserCommandsBO.formBrowserCommandsPage,
      'getSearchDetails');

    stubGetSeachDetails.resolves(
      {
        command: 'command...',
        type: 't1',
      });

    return Promise.all([
      formBrowserCommandsBO.seeSearchDetailsWithParamater({ command: 'command...', type: 't1' }).should.eventually.be.fulfilled,
      formBrowserCommandsBO.seeSearchDetailsWithParamater({ command: 'abc...', type: 't1' }).should.eventually.be.rejected,
      formBrowserCommandsBO.seeSearchDetailsWithParamater({ command: 'command...', type: 't2' }).should.eventually.be.rejected,
    ]);
  });

});
