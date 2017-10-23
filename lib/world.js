'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.Should();
chaiAsPromised.transferPromiseness = browser.transferPromiseness;

global.expect = chai.expect;

require('./browser-command/all-browser-commands');
global.faker = require('faker');
global.logger = require('./helper/logger');
global.NtafHelper = require('./helper/helper');
