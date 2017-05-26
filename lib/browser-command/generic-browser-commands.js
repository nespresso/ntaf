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
        promises.push(browser.waitForVisible(elements[i]));
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
  },

  /**
   * @desc Scroll vertically and horizontally before clicking. Can be used for instance when there is a floating object that hides the
   * button to click on. A scroll would allow to make the button move out of the floating object and thus be clickable.
   * @param {string} selector CSS selector to match
   * @param {int} hOffset Offset for the horizontal scroll
   * @param {int} vOffset Offset for the vertical scroll
   */
  scrollAndClick(selector, hOffset, vOffset) {
    return browser.getElementSize('body')
      .then(function (documentHeight) {
        return browser.getLocation(selector)
          .then(function (currentOffset) {
            let vOffsetToApply = currentOffset.y;
            if (documentHeight - currentOffset.y > vOffset) {
              vOffsetToApply = currentOffset.y - vOffset;
            }

            let hOffsetToApply = currentOffset.x;
            if (documentHeight - currentOffset.x > hOffset) {
              hOffsetToApply = currentOffset.x - hOffset;
            }

            return browser.scroll(hOffsetToApply, vOffsetToApply).pause(200);
          });
      })
      .then(function () {
        return browser.element(selector)
          .then(function (elementId) {
            return browser.elementIdClick(elementId.value.ELEMENT);
          });
      });
  },

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

/**
 * @alias genericBrowserCommand.scrollAndClick
 * @memberOf browser
 * @method scrollAndClick
 */
browser.addCommand(
  'scrollAndClick',
  function (selector, hOffset, vOffset) {
    return genericBrowserCommands.scrollAndClick(selector, hOffset, vOffset);
  }
);

module.exports = genericBrowserCommands;
