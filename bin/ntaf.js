#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const gulp = require('gulp');
const gulpDel = require('del');
const gulpMocha = require('gulp-mocha');
const webdriver = require('gulp-webdriver');
const yargs = require('yargs');
const wdioOptions = { cucumberOpts: {} };
let configFile;

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
  //To follow coming updates review
});

gulp.task('generate-local-conf', () => {
  console.log('Copy configuration files.');
  return gulp.src('./node_modules/ntaf/template/wdio.*.conf.js')
    .pipe(gulp.dest('./'));
});

/**
 * Run functional tests with given configuration.
 * @param {String} config
 */
const runProject = config => {
  if (!config.config_file) {
    configFile = 'wdio.conf.js';
  } else {
    configFile = config.config_file;
  }

  if (config.tagExpression.length) {
    wdioOptions.cucumberOpts.tagExpression = config.tagExpression;
  }

  if (config.baseUrl.length) {
    wdioOptions.baseUrl = config.baseUrl;
  }

  if (config.timeout) {
    wdioOptions.cucumberOpts.timeout = config.timeout;
  }

  if (config.realm.length) {
    configFile = `./conf/realm/${config.realm}.js`;
  }

  gulp.task('test-functional')();
};

/**
 * Create project structure tree.
 * @return {Promise}
 */
const installProject = async () => {
  console.log('Creating test project structure...');

  const allPromises = [
    fs.copy('node_modules/ntaf/template/', '.'),
    fs.copy('node_modules/ntaf/README.md', 'README.md'),
  ];

  const emptyDirectories = [
	'src/features',
    	'src/step_definitions',
	'src/support/business-object',
	'src/support/component-object',
	'src/support/data',
	'src/support/helper',
	'src/support/page-object',
	'conf/realm',
	'logs',
  ];

  emptyDirectories.forEach(directory => {
    allPromises.push(fs.mkdirs(directory));
  });

  try {
    await Promise.all(allPromises);
    await fs.move('gitignore', '.gitignore');
    await fs.move('npmrc', '.npmrc');
    console.log('Test project structure successfully created.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

};

yargs
  .command({
    command: 'clean',
    desc: 'Clean project',
    handler: () => gulp.task('clean')(),
  })
  .command({
    command: 'install',
    desc: 'Create project structure tree',
    handler: () => installProject(),
  })
  .command({
    command: 'generate-local-conf',
    desc: 'Generate or replace existing local configuration.',
    handler: () => gulp.task('generate-local-conf')(),
  })
  .command({
    command: 'run [config_file]',
    desc: 'Run functional tests with given configuration.',
    handler: argv => runProject(argv),
    builder: yargsObj => {
      yargsObj.option('baseUrl', {
        describe: 'Base url to override wdio.conf.js',
        default: '',
      });
      yargsObj.option('tagExpression', {
        describe: 'Tag expression to override wdio.conf.js',
        default: '',
      });
      yargsObj.option('timeout', {
        describe: 'Cucumber timeout to override wdio.conf.js',
        default: '',
      });
      yargsObj.option('realm', {
        describe: 'Realm configuration to be used',
        default: '',
      });
    },
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
  .demandCommand()
  .help()
  .argv;
