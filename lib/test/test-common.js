'use strict';

require('app-module-path').addPath(__dirname + '/../');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

require('sinon-as-promised');

global.sinon = require('sinon');
global.expect = chai.expect;

const webdriverio = require('webdriverio');
global.browser = webdriverio.remote();

global.NtafHelper = require('ntaf/lib/helper/helper');
