'use strict';

const formBrowserCommands = {

  /**
   *  @desc Fill in form on the screen matching the elements ID from $fieldsToID and data from $data
   *  @param {Object} fieldsToID
   *  @param {Object} data
   *  @return {Object} Promise
   */
  fillInForm(fieldsToID, data) {
    const promisesArray = [];
    for (const property in data) {
      //Avoid if element not available on the page
      if (fieldsToID[property]) {
        promisesArray.push(this.setValueToField(fieldsToID[property], data[property]));
      }
    }

    return Promise.all(promisesArray);
  },

  /**
   *  @desc Select the radio button corresponding to $selector.
   *  @param {String} selector
   *  @returns {Object} Promise
   */
  selectRadioButton(selector) {
    return browser.click(selector);
  },

  /**
   *  @desc Select the radio button corresponding to $selector by clicking on the radio button
   *  label.
   *  @param {String} selector
   *  @returns {Object} Promise
   */
  selectRadioButtonFromLabel(selector) {
    return browser
      .getAttribute(selector, 'id')
      .then(function (id) {
        return browser.click('label[for="' + id + '"]');
      });
  },

  /**
   *  Set value to the field corresponding to selector
   *  Manages the different type of fields in a form
   *  @param {String} selector
   *  @param {String} value
   *  @returns {Object} Promise
   */
  setValueToField(selector, value) {
    const _this = this;
    let tagName;

    return browser
      .getTagName(selector)
      .then(function (ret) {
        tagName = ret;
      })
      .then(function () {
        switch (tagName) {
          case 'select':
            return browser.selectByVisibleText(selector, value);
          case 'input':
            return _this.setValueToInputField(selector, value);
          default:
            return browser.setValue(selector);
        }
      });
  },

  /**
   *  @desc Set value to the field corresponding to selector for input fields only
   *  @param {String} selector
   *  @param {String} value
   *  @returns {Object} Promise
   */
  setValueToInputField(selector, value) {
    let inputType;
    const _this = this;

    return browser
      .getAttribute(selector, 'type')
      .then(function (type) {
        inputType = type;
      })
      .then(function () {
        if (inputType === 'radio') {
          return _this.selectRadioButton(selector);
        } else if (inputType === 'checkbox') {
          if (value === true) {
            return _this.tickCheckbox(selector);
          } else {
            return _this.untickCheckbox(selector);
          }
        } else {
          return browser.setValue(selector, value);
        }
      });
  },

  /**
   * @desc Tick checkbox.
   * @param {String} selector
   * @returns {Object} Promise
   */
  tickCheckbox(selector) {
    return browser
      .isSelected(selector)
      .then(function (isSelected) {
        if (isSelected) {
          return Promise.resolve();
        } else {
          return browser.click(selector);
        }
      });
  },

  /**
   * @desc Untick checkbox.
   * @param {String} selector
   * @returns {Object} Promise
   */
  untickCheckbox(selector) {
    return browser
      .isSelected(selector)
      .then(function (isSelected) {
        if (isSelected) {
          return browser.click(selector);
        } else {
          return Promise.resolve();
        }
      });
  }

};

/**
 * @alias formBrowserCommands.fillInForm
 * @memberOf browser
 * @method fillInForm
 */
browser.addCommand(
  'fillInForm',
  function (fieldsToID, data) {
    return formBrowserCommands.fillInForm(fieldsToID, data);
  }
);

/**
 * @alias formBrowserCommands.selectRadioButton
 * @memberOf browser
 * @method selectRadioButton
 */
browser.addCommand(
  'selectRadioButton',
  function (selector) {
    return formBrowserCommands.selectRadioButton(selector);
  }
);

/**
 * @alias formBrowserCommands.selectRadioButtonFromLabel
 * @memberOf browser
 * @method selectRadioButtonFromLabel
 */
browser.addCommand(
  'selectRadioButtonFromLabel',
  function (selector) {
    return formBrowserCommands.selectRadioButtonFromLabel(selector);
  }
);

/**
 * @alias formBrowserCommands.tickCheckbox
 * @memberOf browser
 * @method tickCheckbox
 */
browser.addCommand(
  'tickCheckbox',
  function (selector) {
    return formBrowserCommands.tickCheckbox(selector);
  }
);

/**
 * @alias formBrowserCommands.untickCheckbox
 * @memberOf browser
 * @method untickCheckbox
 */
browser.addCommand(
  'untickCheckbox',
  function (selector) {
    return formBrowserCommands.untickCheckbox(selector);
  }
);

module.exports = formBrowserCommands;
