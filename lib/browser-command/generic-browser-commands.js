'use strict';

const genericBrowserCommands = {

  /**
   * @function waitForVisible
   * @desc waitForVisible on multiple elements
   * @since 1.0.0
   * @param {string[]} elements - Array of elements that are CSS selectors
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
   * @function getNumberOfElements
   * @desc Get the number of elements matching a specific CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
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
   * @function clickNthElement
   * @desc Click on the nth element of the list of elements matching the CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
   * @param {number} nth - Element to click on. First element is at rank 1.
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
   * @function clickFirstElement
   * @desc Click on the first element of the list of elements matching the CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
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
   * @function clickLastElement
   * @desc Click on the last element of the list of elements matching the CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
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
   * @since 1.1.0
   * @param {string} selector CSS selector to match
   * @param {int} hOffset Offset for the horizontal scroll
   * @param {int} vOffset Offset for the vertical scroll
   * @param {int} [pause = 200] Pause in ms after scrolling (for the floating element to disappear for instance)
   */
  scrollAndClick(selector, hOffset, vOffset, pause = 200) {
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

            return browser.scroll(hOffsetToApply, vOffsetToApply).pause(pause);
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

browser.addCommand(
  'waitForAllVisible',
  function (elements) {
    return genericBrowserCommands.waitForAllVisible(elements);
  }
);

browser.addCommand(
  'getNumberOfElements',
  function (selector) {
    return genericBrowserCommands.getNumberOfElements(selector);
  }
);

browser.addCommand(
  'clickNthElement',
  function (selector, nth) {
    return genericBrowserCommands.clickNthElement(selector, nth);
  }
);

browser.addCommand(
  'clickFirstElement',
  function (selector) {
    return genericBrowserCommands.clickFirstElement(selector);
  }
);

browser.addCommand(
  'clickLastElement',
  function (selector) {
    return genericBrowserCommands.clickLastElement(selector);
  }
);

browser.addCommand(
  'scrollAndClick',
  function (selector, hOffset, vOffset) {
    return genericBrowserCommands.scrollAndClick(selector, hOffset, vOffset);
  }
);

module.exports = genericBrowserCommands;
