'use strict';

const genericBrowserCommands = {

  /**
   * @desc waitForVisible on multiple elements.
   * @param {Array} elements Array of elements to wait to be visible
   * @returns {Promise}
   */
  waitForAllVisible(elements) {
    const promises = [];

    for (const i in elements) {
      if (elements.hasOwnProperty(i)) {
        promises.push(this.waitForVisible(elements[i]));
      }
    }

    return Promise.all(promises);
  },

  /**
   * @method getNumberOfElements
   * @param {string} selector CSS selector to match
   * @returns {Promise}
   */
  getNumberOfElements(selector) {
    return browser
      .elements(selector)
      .then(function (elements) {
        return Promise.resolve(elements.value.length);
      });
  },

  /**
   * @desc Click on the nth element of the list of elements matching the CSS selector.
   * @param {string} selector CSS selector to match
   * @param {number} nth element to click on. First element is at rank 1.
   * @returns {Promise}
   */
  clickNthElement(selector, nth) {
    return browser
      .elements(selector)
      .then(function (elements) {
        return browser.elementIdClick(elements.value[nth - 1].ELEMENT);
      });
  },

  /**
   * @desc Click on the first element of the list of elements matching the CSS selector.
   * @param {string} selector CSS selector to match
   * @returns {Promise}
   */
  clickFirstElement(selector) {
    return browser
      .elements(selector)
      .then(function (elements) {
        return browser.elementIdClick(elements.value[0].ELEMENT);
      });
  },

  /**
   * @desc Click on the last element of the list of elements matching the CSS selector.
   * @param {string} selector CSS selector to match
   * @returns {Promise}
   */
  clickLastElement(selector) {
    return browser
      .elements(selector)
      .then(function (elements) {
        return browser.elementIdClick(elements.value[elements.value.length - 1].ELEMENT);
      });
  }

};

/**
 * @alias genericBrowserCommand.waitForAllVisible
 * @memberOf browser
 * @method waitForAllVisible
 */
browser.addCommand(
  'waitForAllVisible',
  function (elements) {
    return genericBrowserCommands.waitForAllVisible(elements);
  }
);

/**
 * @alias genericBrowserCommand.getNumberOfElements
 * @memberOf browser
 * @method getNumberOfElements
 */
browser.addCommand(
  'getNumberOfElements',
  function (selector) {
    return genericBrowserCommands.getNumberOfElements(selector);
  }
);

/**
 * @alias genericBrowserCommand.clickNthElement
 * @memberOf browser
 * @method clickNthElement
 */
browser.addCommand(
  'clickNthElement',
  function (selector, nth) {
    return genericBrowserCommands.clickNthElement(selector, nth);
  }
);

/**
 * @alias genericBrowserCommand.clickFirstElement
 * @memberOf browser
 * @method clickFirstElement
 */
browser.addCommand(
  'clickFirstElement',
  function (selector) {
    return genericBrowserCommands.clickFirstElement(selector);
  }
);

/**
 * @alias genericBrowserCommand.clickLastElement
 * @memberOf browser
 * @method clickLastElement
 */
browser.addCommand(
  'clickLastElement',
  function (selector) {
    return genericBrowserCommands.clickLastElement(selector);
  }
);

module.exports = genericBrowserCommands;
