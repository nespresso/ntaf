[![Build Status](https://travis-ci.org/nespresso/ntaf.svg?branch=master)](https://travis-ci.org/nespresso/ntaf)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/5wsjr8by0lqsngw4/branch/master?svg=true)](https://ci.appveyor.com/project/racodond/ntaf/branch/master)
[![Quality Gate status](https://sonarcloud.io/api/badges/gate?key=ntaf)](https://sonarcloud.io/dashboard/index/ntaf)
[![npm version](https://badge.fury.io/js/ntaf.svg)](https://badge.fury.io/js/ntaf)

# Nestle Test Automation Framework (NTAF)

This framework is designed to help you get quickly started with test automation on any project.
It is based on [WebdriverIO](http://webdriver.io/) and [cucumber](https://cucumber.io/) ([cucumberJS](https://github.com/cucumber/cucumber-js) to be exact).
Integrating this module provides a ready-to-go environment to write and execute functional test scenarios.
It includes:
* A template to generate your test automation project so that you don't start from a blank page
* The necessary packages pre-configured to be able to run your scenarios without requiring any other setup. The only requirement is to have a browser on the machine running the tests: either Chrome or Firefox.
* [Guidelines and good practices](https://github.com/nespresso/ntaf/blob/master/template/doc/Framework.md) to ensure great maintainability of test scenarios
* A decoupled architecture between scenarios and data sets to allow high execution scalability
* Some useful [custom browser commands](http://webdriver.io/guide/usage/customcommands.html) such as `fillInForm` to ease and accelerate test automation writing. See related [JSDoc](https://nespresso.github.io/ntaf/) for more details.

This framework is suitable for big solutions that will be covered by an important number of scenarios.
Note that it requires good development skills as well as good knowledge and understanding of JavaScript.

## Integrating NTAF to Your Project

### Prerequisites
* Install Node.js v8.7.0 or greater.

### Adding NTAF Package and Configuration to Your Project
1. Create a new folder <AUTOMATED_TESTS> in your project to host your automated tests.
2. Create a new NPM project by executing `npm init`. More information about the different options [here](https://docs.npmjs.com/getting-started/using-a-package.json).
3. Install NTAF package by running the following command from <AUTOMATED_TESTS>: `npm install --save ntaf`. It creates a `node_modules` directory containing all the dependencies needed to run the project.
4. From <AUTOMATED_TESTS>, run `npx ntaf install` to generate the skeleton of your test project.

### Behind a Proxy
Set the configuration of your proxy by editing the `.npmrc` file in your home directory:
```
proxy=http://localhost:3128
https-proxy=http://localhost:3128
```


## Running Functional Tests
* Run `npx run` to launch the tests as they would be played remotely.
* Run `npx run wdio.local.conf.js` to run the tests with local configuration.
* Run `npx run wdio.debug.conf.js` to run the tests with debug configuration (see Running Tests in Debug Mode section
for mode details).

Note that the local and debug configurations have to be generated first (see Configuration section).

### Configuration
* The global configuration is set in the `wdio.conf.js` file, in the root folder of your project.
* The local configuration is set in the `wdio.local.conf.js`. This local configuration can be reset by running
`npm run generate-local-conf`.
* The debug configuration is set in the `wdio.debug.conf.js`. This debug configuration can be reset by running
`npm run generate-local-conf`.

### Parameters
To pass parameters to the command, add `--`: `npx ntaf run --parameter1=value1`

#### URL of the Website to Test
Add command line parameter `--baseUrl="https://base.url"` or update the wdio configuration file accordingly.

#### Locale
Add command line parameter `--locale="en"` or update the wdio configuration file accordingly.
 
#### Running a Subset of Tests Using Tags
Add command line parameter `--tagExpression='@tag'`.

Tags can be combined:
* `--tagExpression='@tag1 or @tag2'` runs test tagged with `@tag1` or `@tag2`
* `--tagExpression='@tag1 and @tag2'` runs test tagged with both `@tag1` and `@tag2`
* `--tagExpression='not @tag1'` runs tests not tagged with `@tag1`

See [Cucumber Tag Expressions documentation](https://docs.cucumber.io/tag-expressions/) for more details.

#### Realm (market, brand, environment, ...)
A realm is a configuration file that defines some wdio properties specific to a realm. A realm can be seen as a market, 
a brand, an environment (such as dev or staging), etc. or a combination of them. Realm files are stored in the
`conf/realm` directory.

Usually realms define at least the following properties:
* `baseUrl`: website to test
* `specs`: list of features to run

Add command line parameter `--realm="xxx"`. Where `xxx` is the file name in `conf/real` without the `.js` extension.

For example:
* To run NRT tests from the catalog domain on mywebsite.com: `npx ntaf run --baseUrl="https://mywebsite.com" --tagExpression='@nrt and @catalog'`
* To run NRT tests on realm `us_dev`: `npx ntaf run --realm="us_dev" --tagExpression='@nrt'`


## Running Functional Tests in Debug Mode

### Initial Configuration

#### Installing node-inspector
1. Install `node-inspector`: `npm install -g node-inspector`

#### Setting Configuration in IntelliJ
1. Go to Run > Edit Configurations...
1. Add New Configuration > Node.js Remote Debug and fill in details as follows:
![alt text](https://raw.githubusercontent.com/nespresso/ntaf/master/template/doc/resources/intellij-debug-configuration.png "Name: My Node.js Remote Debug / Host: 127.0.0.1 / Port: 5859")

### Running Tests
1. In a terminal, run `node-inspector`. The following should be printed:
`Node Inspector v0.12.8
 Visit http://127.0.0.1:8080/?port=5858 to start debugging.
`
1. In IntelliJ, Run > Debug 'My Node.js Remote Debug'
1. In IntelliJ, add breakpoints to your code
1. In a terminal, run `npx ntaf run wdio.debug.conf.js` (usually targeting a single test: `npx ntaf run wdio.debug.conf.js --tagExpression='@mytest'`). Note that the local debug configuration has to be generated first (see Configuration section).
1. Once the first breakpoint is reached, use standard IntelliJ Debug window to move forward and debug.


## Running Unit Tests
* Run `npx ntaf test-unit` to run unit tests
* Run `npx ntaf test-unit-with-coverage` to run unit tests with code coverage computation


## Writing Automated Tests
Read detailed explanations in [Framework.md](https://github.com/nespresso/ntaf/blob/master/template/doc/Framework.md).
