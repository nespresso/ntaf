#!/usr/bin/env node
'use strict';

const fs = require('fs-extra')

console.log('Creating local and debug configuration files...')
createConfigurationFile('wdio.local.conf.js');
createConfigurationFile('wdio.debug.conf.js');

function createConfigurationFile(path) {
  fs.pathExists(path)
    .then(exists => {
      if (exists) {
        console.log('>>> Configuration file ' + path + ' already exists. Existing file left unchanged.');
      } else {
        fs.copy('scripts/template-' + path, path, (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
        });
        console.log('>>> Configuration file ' + path + ' created.');
      }
    });
}
