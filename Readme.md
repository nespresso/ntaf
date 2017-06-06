[![Build Status](https://travis-ci.org/nespresso/ntaf.svg?branch=master)](https://travis-ci.org/nespresso/ntaf)
[![Quality Gate status](https://sonarqube.com/api/badges/gate?key=ntaf)](https://sonarqube.com/dashboard/index/ntaf)
[![npm version](https://badge.fury.io/js/ntaf.svg)](https://badge.fury.io/js/ntaf)

# Nestle Test Automation Framework (NTAF)

This framework is designed to help you get quickly started with test automation on any project.
It is based on [WebdriverIO](http://webdriver.io/) and [cucumber](https://cucumber.io/) ([cucumberJS](https://github.com/cucumber/cucumber-js) to be exact).
Integrating this module provides a ready-to-go environment to write and execute functional test scenarios.
It includes:
* A template to generate your test automation project so that you don't start from a blank page
* The necessary packages pre-configured to be able to run your scenarios without requiring any other setup. Selenium, PhantomJS browser already coming with it.
* [Guidelines and good practices](https://github.com/nespresso/ntaf/blob/master/template/doc/Framework.md) to ensure great maintainability of test scenarios
* A decoupled architecture between scenarios and datasets to allow high execution scalability
* Some useful [custom browser commands](http://webdriver.io/guide/usage/customcommands.html) such as `fillInForm` to ease and accelerate test automation writing. See related [JSDoc](https://nespresso.github.io/ntaf/) for more details.

This framework is suitable for big solutions that will be covered by an important number of scenarios.
Note that it requires good development skills as well as good knowledge and understanding of JavaScript.

## Integrating NTAF to Your Project

### Prerequisites
* Install Node.js v6.10.3 or greater.

### Adding NTAF Package and Configuration to Your Project
1. Create a new folder <AUTOMATED_TESTS> in your project to host your automated tests.
2. Add a `package.json` file into <AUTOMATED_TESTS> based on the below model:
```
{
    "name": "my-automated-tests",
    "version": "1.0.0",
    "dependencies": {
      "ntaf": "X.X.X",
      "grunt": "1.0.1"
    },
    "scripts": {
      "clean": "grunt clean",
      "generate-local-conf": "grunt copy:generateLocalConf",
      "prepare": "grunt prepare",
      "test": "grunt test-functional",
      "test-local": "grunt test-functional-local",
      "test-debug": "grunt test-functional-debug",
      "test-unit": "grunt test-unit",
      "test-unit-with-coverage": "grunt test-unit-with-coverage"
    },
    ...
}    
```
3. Install the project dependencies by running the following command from <AUTOMATED_TESTS>: `npm install`. It creates a `node_modules` directory containing all the dependencies needed to run the project.
4. From <AUTOMATED_TESTS>, run `./node_modules/.bin/ntaf install` to generate the skeleton of your test project.

### Behind a Proxy
Set the configuration of your proxy by editing the `.npmrc` file in your home directory:
```
proxy=http://localhost:3128
https-proxy=http://localhost:3128
```


## Running Tests
Run `npm run test` to launch the tests as they would be played remotely.
By default it runs all the tests tagged as `@nrt`.

Run command line `npm run test-local` to run the tests with your local configuration.

### Configuration
The global configuration is set in the `wdio.conf.js` file in the root folder of your project.

The local configuration is set in the `wdio.local.conf.js`. This local configuration can be reset by running `npm run generate-local-conf`.

### Parameters
To pass parameters to the command, add `--`: `npm run test -- --parameter1=value1`

#### URL of the Website to Test
Add command line parameter `--baseUrl="https://base.url"` or update the wdio configuration file accordingly.

#### Locale
Add command line parameter `--locale="en"` or update the wdio configuration file accordingly.
 
#### Running a Subset of Tests Using Tags
Add command line parameter `--tags='@tag'`.
You can add several tags separated by commas such as `--tags='@tag1,@tag2'`. It will run tests with tags `@tag1` and `@tag2`.
You can also add negation with `~` such as`--tags='@tag1,~@tag2'`. It will tests with tag `@tag1` but not `@tag2`.

#### Realm (market, brand, environment, ...)
A realm is a configuration file that defines some wdio properties specific to a realm. A realm can be seen as a market, 
a brand, an environment (such as dev or staging), etc. or a combination of them. Realm files are stored in the
`conf/realm` directory.

Usually realms define at least the following properties:
* `baseUrl`: website to test
* `specs`: list of features to run

Add command line parameter `--realm="xxx"`. Where `xxx` is the file name in `conf/real` without the `.js` extension.
 
 
For example:
* To run NRT tests from the catalog domain on mywebsite.com: `npm run test -- --baseUrl="https://mywebsite.com" --tags='@nrt,@catalog'`
* To run NRT tests on realm `us_dev`: `npm run test -- --realm="us_dev" --tags='@nrt'`


## Running Tests in Debug Mode

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
1. In a terminal, run `npm run test-debug` (usually targeting a single test: `npm run test-debug -- --tags='@mytest'`)
1. Once the first breakpoint is reached, use standard IntelliJ Debug window to move forward and debug.


## Writing Automated Tests
Read detailed explanations in [Framework.md](https://github.com/nespresso/ntaf/blob/master/template/doc/Framework.md).
