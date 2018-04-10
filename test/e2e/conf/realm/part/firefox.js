'use strict';

module.exports = {
  capabilities: [
    {
      browserName: 'firefox',
      acceptInsecureCerts: true,
      // "moz:firefoxOptions": {
      //   args: ['-headless'],
      // }
    },
  ],
};
