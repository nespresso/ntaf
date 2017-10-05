'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

global.sinon = require('sinon');
global.expect = chai.expect;

const webdriverio = require('webdriverio');
global.browser = webdriverio.remote();

global.NtafHelper = require('../helper/helper');
global.logger = require('../helper/logger');
