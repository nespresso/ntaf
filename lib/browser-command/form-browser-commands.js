'use strict';

const formBrowserCommands = {

  /**
   * @function fillInForm
   * @desc Fill in a form with data
   * @since 1.0.0
   * @param {Object} fieldsToID - Object whose property values are CSS selectors matching HTML fields
   * <pre>
   * For example:
   *   {
   *     firstName: 'input[id="editPersoInfoDTO.information.firstName"]',
   *     newPassword: '#password',
   *     confirmPassword: '#confirmPassword',
   *   }
   * </pre>
   * @param {Object} data - Object whose property values are data to be inserted into related HTML fields
   * <pre>
   *   {
   *     firstName: 'John',
   *     newPassword: 'my_password',
   *     confirmPassword: 'my_password',
   *   }
   * </pre>
   * @return {Object} Promise
   */
  fillInForm(fieldsToID, data) {
    const promisesArray = [];
    for (const property in data) {
      // Avoid if element not available on the page
      if (fieldsToID[property]) {
        promisesArray.push(this.setValueToField(fieldsToID[property], data[property]));
      }
    }

    return Promise.all(promisesArray);
  },

  /**
   * @function selectRadioButton
   * @desc Select a radio button identified with a CSS selector by clicking on it
   * @since 1.0.0
   * @param {String} selector - CSS selector to identify the radio button
   * @returns {Object} Promise
   */
  selectRadioButton(selector) {
    return browser.click(selector);
  },

  /**
   * @function selectRadioButtonFromLabel
   * @desc Select a radio button identified with a CSS selector by clicking on its associated label
   * @since 1.0.0
   * @param {String} selector - CSS ID selector to identify the radio button
   * @returns {Object} Promise
   */
  selectRadioButtonFromLabel(selector) {
    return browser
      .getAttribute(selector, 'id')
      .then(function (id) {
        return browser.click('label[for="' + id + '"]');
      });
  },

  /**
   * @function setValueToField
   * @desc Set a value to a field. Supports all types of HTML field
   * @since 1.0.0
   * @param {String} selector - CSS selector to identify the field
   * @param {String} value - Value
   * @returns {Object} Promise
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
   * @function setValueToInputField
   * @desc Set a value to the first input field matching the CSS selector
   * @since 1.0.0
   * @param {String} selector - CSS selector to identify the input field
   * @param {String} value - Value
   * @returns {Object} Promise
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
   * @function tickCheckbox
   * @desc Tick a checkbox
   * @since 1.0.0
   * @param {String} selector - CSS selector to identify the checkbox
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
   * @function untickCheckbox
   * @desc Untick a checkbox
   * @since 1.0.0
   * @param {String} selector - CSS selector to identify the checkbox
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
  },

};

browser.addCommand(
  'fillInForm',
  function (fieldsToID, data) {
    return formBrowserCommands.fillInForm(fieldsToID, data);
  }
);

browser.addCommand(
  'selectRadioButton',
  function (selector) {
    return formBrowserCommands.selectRadioButton(selector);
  }
);

browser.addCommand(
  'selectRadioButtonFromLabel',
  function (selector) {
    return formBrowserCommands.selectRadioButtonFromLabel(selector);
  }
);

browser.addCommand(
  'tickCheckbox',
  function (selector) {
    return formBrowserCommands.tickCheckbox(selector);
  }
);

browser.addCommand(
  'untickCheckbox',
  function (selector) {
    return formBrowserCommands.untickCheckbox(selector);
  }
);

module.exports = formBrowserCommands;
