#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');

const emptyDirectories = [
  'src/features',
  'src/step-definitions',
  'src/support/business-object',
  'src/support/component-object',
  'src/support/data',
  'src/support/helper',
  'src/support/page-object',
  'conf/realm',
];

console.log('Creating test project structure...');

let allPromises = [
  fs.copy('node_modules/ntaf/template/', '.'),
  fs.copy('node_modules/ntaf/Readme.md', 'Readme.md'),
];

emptyDirectories.forEach(directory => {
  allPromises.push(fs.mkdirs(directory));
});

Promise.all(allPromises)
  .then(
    () => fs.move('gitignore', '.gitignore'),
    (err) => onError(err)
  )
  .then(
    () => console.log('Test project structure successfully created.'),
    (err) => onError(err)
  );

function onError(err) {
  console.error(err);
  process.exit(1);
}
