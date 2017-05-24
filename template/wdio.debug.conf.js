'use strict';

const merge = require('merge');

const config = {
  debug: true,
  maxInstances: 1,
  cucumberOpts: {
    timeout: 30 * 1000 * 4,
  },

  // --harmony_rest_parameters important to have rest parameters
  // function(...args)
  execArgv: ['--expose_debug_as=v8debug', '--harmony_rest_parameters'],
};

exports.config = merge.recursive(true, require('./wdio.local.conf').config, config);
