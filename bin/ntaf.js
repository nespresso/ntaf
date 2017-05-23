#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');

if (process.argv[2] == 'install') {
  const emptyDirectories = [
    'src/features',
    'src/step-definitions',
    'src/support/business-object',
    'src/support/component-object',
    'src/support/data',
    'src/support/helper',
    'src/support/page-object',
  ];

  console.log('Copying test project template...');
  fs.copy('node_modules/ntaf/template/', '.', onError);
  fs.copy('node_modules/ntaf/Readme.md', 'Readme.md', onError);

  for (let i in emptyDirectories) {
    const directoryName = emptyDirectories[i];
    console.log('Creating ' + directoryName + ' directory...');
    fs.mkdirs(directoryName, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  };

} else if (process.argv[2] == 'run') {
  console.log('run');
} else {
  console.log('Usage: ntaf install|run');
}

function onError(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}
