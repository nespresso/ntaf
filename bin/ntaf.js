#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const merge = require('merge');
const logger = require('../lib/helper/logger');
const gulp = require('gulp');
const gulpDel = require('del');
const gulpMocha = require('gulp-mocha');
const debug = require('gulp-debug');
const webdriver = require('gulp-webdriver');
const yargs = require('yargs');
let configFile;
let wdioOptions = { cucumberOpts: {} };

gulp.task('clean', () => gulpDel(['output', 'log']));

gulp.task('prepare', () =>
  gulp.src('./', { read: false })
    .pipe(gulp.dest('./log/'))
    .pipe(gulp.dest('./output/'))
    .pipe(gulp.dest('./output/errorShots'))
);

gulp.task('webdriver', () => gulp.src(configFile).pipe(webdriver(wdioOptions)));

gulp.task('test-functional', gulp.series('clean', 'prepare', 'webdriver'));

gulp.task('test-unit', () =>
  gulp.src('./test/**/*.test.js')
    .pipe(gulpMocha({
      reporter: 'spec',
      require: './test/test-common',
    }))
);

gulp.task('test-unit-with-coverage', () => {
  //Does not work with version of gulp-mocha 4.x.x
  //To follow coming updates
});

/**
 * Run functional tests with given configuration.
 * @param {String} config
 */
const runProject = (config) => {
  if (!config.config_file) {
    configFile = 'wdio.conf.js';
  } else {
    configFile = config.config_file;
  }

  if (config.tags.length) {
    if (Array.isArray(config.tags)) {
      wdioOptions.cucumberOpts.tags = config.tags;
    } else {
      wdioOptions.cucumberOpts.tags = config.tags.split(',');
    }
  }

  if (config.baseUrl.length) {
    wdioOptions.baseUrl = config.baseUrl;
  }

  if (config.timeout) {
    wdioOptions.cucumberOpts.timeout = config.timeout;
  }

  if (config.realm.length) {
    configFile = './conf/realm/' + config.realm + '.js';
  }

  gulp.task('test-functional')();
};

/**
 * Create project structure tree.
 * @return {Promise}
 */
const installProject = () => {
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

  const onError = function (err) {
    console.error(err);
    process.exit(1);
  };

  console.log('Creating test project structure...');

  const allPromises = [
    fs.copy('node_modules/ntaf/template/', '.'),
    fs.copy('node_modules/ntaf/Readme.md', 'Readme.md'),
  ];

  emptyDirectories.forEach(directory => {
    allPromises.push(fs.mkdirs(directory));
  });

  return Promise.all(allPromises)
    .then(
      () => fs.move('gitignore', '.gitignore'),
      err => onError(err)
    )
    .then(
      () => console.log('Test project structure successfully created.'),
      err => onError(err)
    );
};

yargs
  .command({
    command: 'install',
    desc: 'Create project structure tree',
    handler: () => installProject(),
  })
  .command({
    command: 'run [config_file]',
    desc: 'Run functional tests with given configuration.',
    builder: (yargs) => {
      yargs.option('baseUrl', {
        describe: 'Base url to override wdio.conf.js',
        default: '',
      });
      yargs.option('tags', {
        describe: 'Tags to override wdio.conf.js',
        default: '',
      });
      yargs.option('timeout', {
        describe: 'Cucumber timeout to override wdio.conf.js',
        default: '',
      });
      yargs.option('realm', {
        describe: 'Realm configuration to be used',
        default: '',
      });
    },
    handler: argv => runProject(argv),
  })
  .command({
    command: 'test-unit',
    desc: 'Run unit tests.',
    handler: () => gulp.task('test-unit')(),
  })
  .command({
    command: 'test-unit-with-coverage',
    desc: 'Run unit tests with code coverage computation.',
    handler: () => gulp.task('test-unit-with-coverage')(),
  })
  .help()
  .argv;
