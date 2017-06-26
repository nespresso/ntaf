'use strict';

/**
 * @module browser-command/form-browser-commands
 * @desc Defines custom form browser commands that are made available through the global WebdriverIO browser object.
 */
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
      .then(id => browser.click(`label[for="${id}"]`));
  },

  /**
   * @desc Set a value to a field. Supports all types of HTML field
   * @since 1.0.0
   * @param {String} selector - CSS selector to identify the field
   * @param {String} value - Value
   * @returns {Object} Promise
   */
  setValueToField(selector, value) {
    return browser
      .getTagName(selector)
      .then(tagName => {
        switch (tagName) {
          case 'select':
            return browser.selectByVisibleText(selector, value);
          case 'input':
            return this.setValueToInputField(selector, value);
          default:
            return browser.setValue(selector);
        }
      });
  },

  /**
   * @desc Set a value to the first input field matching the CSS selector
   * @since 1.0.0
   * @param {String} selector - CSS selector to identify the input field
   * @param {String} value - Value
   * @returns {Object} Promise
   */
  setValueToInputField(selector, value) {
    return browser
      .getAttribute(selector, 'type')
      .then(inputType => {
        switch (inputType) {
          case 'radio':
            return this.selectRadioButton(selector);
          case 'checkbox':
            return value === true ? this.tickCheckbox(selector) : this.untickCheckbox(selector);
          default:
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
      .then(isSelected => isSelected ? Promise.resolve() : browser.click(selector));
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
      .then(isSelected => isSelected ? browser.click(selector) : Promise.resolve);
  },

};

/**
 * @alias formBrowserCommands.fillInForm
 * @memberOf browser
 * @function fillInForm
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
