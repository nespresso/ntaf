'use strict';

const merge = require('merge');

const config = {
  specs: [
    './src/features/**/*.feature',
  ],

  baseUrl: 'http://localhost:8080',
  locale: 'en',

  // capabilities: [{
  //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
  //   // grid with only 5 firefox instance available you can make sure that not more than
  //   // 5 instance gets started at a time.
  //   maxInstances: 1,
  //
  //   browserName: 'chrome',
  //   chromeOptions: {
  //     args: ['--headless'], // To run in headless mode
  //     prefs: {
  //       profile: {
  //         default_content_setting_values: { images: 2 }, // Do not load images for tests to run faster
  //         password_manager_enabled: false, // Deactivate password manager
  //       },
  //       credentials_enable_service: false, // Deactivate password manager
  //     },
  //   },
  //
  //   browserName: 'firefox',
  //   acceptInsecureCerts: true,
  //
  //   proxy: {
  //     proxyType: 'system',
  //   },
  //
  // },
  // ],

  logLevel: 'verbose',

  // seleniumInstallArgs: {
  //   // Used by selenium-standalone to download dependencies
  //   proxy: 'http://localhost:3128',
  // },

};

exports.config = merge.recursive(true, require('./wdio.conf').config, config);
