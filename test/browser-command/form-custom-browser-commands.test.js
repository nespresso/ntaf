'use strict';

const form = require('lib/browser-command/form-browser-commands');

describe('Custom Form Browser Commands', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should set value', function () {
    const stubBrowserGetTagName = sandbox.stub(browser, 'getTagName');
    stubBrowserGetTagName.onCall(0).resolves('select');
    stubBrowserGetTagName.onCall(1).resolves('input');
    stubBrowserGetTagName.onCall(2).resolves('textarea');

    const stubBrowserSelectByVisibleText = sandbox.stub(browser, 'selectByVisibleText');
    stubBrowserSelectByVisibleText.onFirstCall().resolves('value');

    const stubSetValueToInputField = sandbox.stub(form, 'setValueToInputField');
    stubSetValueToInputField.onFirstCall().resolves('value');

    const stubBrowserSetValue = sandbox.stub(browser, 'setValue');
    stubBrowserSetValue.onFirstCall().resolves('value');

    return Promise.all([
      expect(form.setValueToField('#field', 'value')).to.eventually.equal('value'),
      expect(form.setValueToField('#field', 'value')).to.eventually.equal('value'),
      expect(form.setValueToField('#field', 'value')).to.eventually.equal('value'),
    ]);
  });

  it('should select right radio button', function () {
    const stubBrowserClick = sandbox.stub(browser, 'click');
    stubBrowserClick.onFirstCall().resolves(true);

    return browser.selectRadioButton('#fieldSelector')
      .then(function () {
        return stubBrowserClick.should.have.been.calledWith('#fieldSelector');
      });
  });

  it('should select right radio button from label', function () {
    const stubBrowserGetAttribute = sandbox.stub(browser, 'getAttribute');
    stubBrowserGetAttribute.onFirstCall().resolves('radioButtonID');

    const stubBrowserClick = sandbox.stub(browser, 'click');
    stubBrowserClick.onFirstCall().resolves(true);

    return browser.selectRadioButtonFromLabel('#fieldSelector')
      .then(function () {
        return stubBrowserClick.should.have.been.calledWith('label[for="radioButtonID"]');
      });
  });

  it('should properly tick checkbox', function () {
    const stubBrowserClick = sandbox.stub(browser, 'click');
    stubBrowserClick.onFirstCall().resolves(true);

    const stubBrowserIsSelected = sandbox.stub(browser, 'isSelected');
    stubBrowserIsSelected.onFirstCall().resolves(true);
    stubBrowserIsSelected.onSecondCall().resolves(false);

    return browser.tickCheckbox('#fieldSelector')
      .then(function () {
        return stubBrowserClick.should.have.been.callCount(0);
      })
      .then(function () {
        return browser.tickCheckbox('#fieldSelector');
      })
      .then(function () {
        return stubBrowserClick.should.have.been.calledWith('#fieldSelector');
      });
  });

  it('should properly untick checkbox', function () {
    const stubBrowserClick = sandbox.stub(browser, 'click');
    stubBrowserClick.onFirstCall().resolves(true);

    const stubBrowserIsSelected = sandbox.stub(browser, 'isSelected');
    stubBrowserIsSelected.onFirstCall().resolves(false);
    stubBrowserIsSelected.onSecondCall().resolves(true);

    return browser.untickCheckbox('#fieldSelector')
      .then(function () {
        return stubBrowserClick.should.have.been.callCount(0);
      })
      .then(function () {
        return browser.untickCheckbox('#fieldSelector');
      })
      .then(function () {
        return stubBrowserClick.should.have.been.calledWith('#fieldSelector');
      });
  });

  it('should fill in form with given data', function () {
    const stubData = {
      firstname: 'Hillary',
      lastname: 'Trump',
      email: 'hillary.trump@nsa.us',
    };
    const stubFieldsToID = {
      firstname: '#firstname',
      lastname: '#lastname',
    };

    const stubSetValue = sandbox.stub(form, 'setValueToField');
    stubSetValue.onFirstCall().resolves('setValue');

    return browser.fillInForm(stubFieldsToID, stubData).then(function () {
      return stubSetValue.should.have.been.calledTwice;
    });
  });

});
