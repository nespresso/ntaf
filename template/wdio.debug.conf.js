'use strict';

const merge = require('ntaf').merge;

const config = {
  debug: true,
  execArgv: ['--inspect'],
  maxInstances: 1,
  cucumberOpts: {
    timeout: 30 * 1000 * 4,
  },
};

exports.config = merge.recursive(true, require('./wdio.local.conf').config, config);
