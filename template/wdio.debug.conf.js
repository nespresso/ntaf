'use strict';

const merge = require('ntaf/node_modules/merge');

const config = {
  debug: true,
  maxInstances: 1,
  cucumberOpts: {
    timeout: 30 * 1000 * 4,
  },

  execArgv: ['--expose_debug_as=v8debug'],
};

exports.config = merge.recursive(true, require('./wdio.local.conf').config, config);
