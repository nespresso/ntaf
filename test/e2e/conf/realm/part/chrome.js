'use strict';

module.exports = {
  capabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        // args: ['--headless'],
        prefs: {
          profile: {
            default_content_setting_values: { images: 2 }, // Do not load images for tests to run faster
            password_manager_enabled: false, // Deactivate password manager
          },
          credentials_enable_service: false, // Deactivate password manager
        },
      },
    },
  ],
};
