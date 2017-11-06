'use strict';

const merge = require('merge');

let config = require('./part/all');
config = merge.recursive(true, require('./part/local'), config);
config = merge.recursive(true, require('./part/chrome'), config);
config = merge.recursive(true, require('./part/tag'), config);
config = merge.recursive(
  true,
  {
    reporterOptions: {
      json: {
        outputDir: 'output-json/all-local-chrome-tag/',
        filename: 'report',
        combined: 'true',
      },
    },
  },
  config);
config = merge.recursive(true, require('../../wdio.conf').config, config);

exports.config = config;
