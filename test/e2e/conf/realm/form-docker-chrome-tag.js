'use strict';

const merge = require('merge');

let config = require('./part/form');
config = merge.recursive(true, require('./part/docker'), config);
config = merge.recursive(true, require('./part/chrome'), config);
config = merge.recursive(true, require('./part/tag'), config);
config = merge.recursive(
  true,
  {
    reporterOptions: {
      json: {
        outputDir: 'output-json/form-docker-chrome-tag/',
        filename: 'report',
        combined: 'true',
      },
    },
    host: 'chrome',
  },
  config);
config = merge.recursive(true, require('../../wdio.conf').config, config);

exports.config = config;
