# Nestle Test Automation Framework

## Project structure

The structure mainly follow [Cucumber.js](https://github.com/cucumber/cucumber-js) structure.

**<font color="#6A76FC">conf/</font>** Configuration  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **realm/** Realm configuration files  
**<font color="#6A76FC">doc/</font>** Documentation  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **Framework.md** this documentation  
**<font color="#6A76FC">src/</font>** all source code  
+-- **<font color="#6A76FC">features/</font>** Scenarios written in Gherkin  
+-- **<font color="#6A76FC">step-definitions/</font>** code matching feature definitions  
+-- **<font color="#6A76FC">support/</font>** all source code supporting feature definitions, basically: the framework  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">browser-command/</font>** Definition of the custom commands added to the browser (`fillInForm`, `selectRadioButton`, etc.)
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">business-object/</font>** framework objects matching business flows  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">component-object/</font>** framework objects transverse to the tested application (such as cart)  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">configuration/</font>** configuration  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">market/</font>** market specific configurations  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **configuration.js** configuration object  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">data/</font>** data objects used by the scenarios  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">helper/</font>** helper objects  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">lib/</font>** external libraries used by the framework and not managed by npm  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">page-object/</font>** page objects (see [design pattern](http://www.assertselenium.com/automation-design-practices/page-object-pattern/))  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **env.js** environment specific configuration for Cucumber.js  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **hooks.js** set hooks on Cucumber.js  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **nespresso.js** transverse object containing Nespresso specifics such as configuration  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **world.js** module called before each scenario by Cucumber.js  
**<font color="#6A76FC">log/</font>** log files (Selenium, browser)  
**<font color="#6A76FC">node_modules/</font>** all node modules installed via `npm install`  
**<font color="#6A76FC">output/</font>** outputs of test execution such as junit or other reports results + error screenshots  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- **<font color="#6A76FC">errorShots/</font>** error screenshots  
**<font color="#6A76FC">test/</font>** unit tests  
**.npmrc** npm configuration specific to this project  
**package.json** npm configuration for the project, including dependencies. Used by npm on `npm install` and `npm run`  
**Readme.md** getting started documentation  
**wdio.conf.js** webdriver.io configuration. Used by `npm run test`  
**wdio.local.conf.js** webdriver.io configuration (inherit from wdio.conf.js) to run test locally. Used by `npm run test-local`  
**wdio.debug.conf.js** webdriver.io configuration (inherit from wdio.local.conf.js) for debugging purposes. Used by `npm run test-debug`  

## Code structure

The framework follow the [Push how down](https://markoh.co.uk/posts/cucumber-best-practices-push-how-down) good practice which consists in pushing the complexity as down as possible in the stack.

The stack of the framework is the following (from top to bottom):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gherkin scenarios  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Step definitions  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Business objects  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;Page/Component objects    

Complexity of a child **must** be hidden by its parent. Meaning Step definitions **must not** directly interact with page objects.

A good example on how the complexity should be pushed down: http://www.spritecloud.com/2015/01/complex-workflows-with-cucumber/.

### Layers

Roles and scope of each layer are presented below.

#### Gherkin

> Gherkin is a Business Readable, Domain Specific Language that lets you describe software’s behaviour without detailing how that behaviour is implemented.

Example of the syntax:
```Gherkin
Feature: Some terse yet descriptive text of what is desired
  Textual description of the business value of this feature
  Business rules that govern the scope of the feature
  Any additional information that will make the feature easier to understand

  Scenario: Some determinable business situation
    Given some precondition
      And some other precondition
    When some action by the actor
      And some other action
      And yet another action
    Then some testable outcome is achieved
      And something else we can check happens too
```

Please read the [Gherkin documentation](https://github.com/cucumber/cucumber/wiki/Gherkin) to learn the syntax.
It is fairly simple to understand and get started.

##### Must do

* Scenario must be unitary and therefore must not rely on previous scenario to be successful.
* Feature must have tags. Tags must be alphabetically sorted.
* Scenario must be intelligible

###### Scenario should remain at a functional level
**<font color="#FF6F6B">Bad</font>**
```Gherkin
When I open the login menu
  And I set #ta-header-username to john.doe@email.com
  And I set #ta-header-password to mypassword
  And I click on #ta-header-login-submit
```

**<font color="#67F86F">Good</font>**
```Gherkin
When I login as john.doe@email.com/mypassword
```

**<font color="#FF6F6B">Bad</font>**
```Gherkin
Then I should see an error message on top of the page stating that the login or password is invalid
```

**<font color="#67F86F">Good</font>**
```Gherkin
Then I should be told that I have provided wrong credentials
```

Scenarios should not make reference to the web page: ~~I set #ta-header-username field~~ / ~~I fill in the form~~ / ~~I click on the login button~~


###### Make sure to target the feature that you want to test

**<font color="#FF6F6B">Bad</font>**
```Gherkin
Scenario Successful logout 
  Given I am on the homepage
  When I log in as john.doe@email.com/mypassword
  And I log out
  Then I should be a visitor
```

**<font color="#67F86F">Good</font>**
```Gherkin
Scenario Successful logout 
  Given I am a customer
  When I log out
  Then I should be a visitor
```

The `When` step(s) should only describe the tested feature/action. In this case, we want to test the logout, not the
login. The fact that the user is logged in must be part of the test requirements (`Given` step), not part of the tested
feature (`When` step).


##### The tense to be used

Read this interesting [blog post](https://lizkeogh.com/2014/09/02/a-little-tense/).

1. All the sentences must start with `I ...`
1. `Given` sentences must use the present or past (present perfect) tense to state the context.
1. `When` sentences must use the present tense with an action verb to describe the actions.
1. `Then` sentences must use the conditional tense to list assertions. They must start with `I should`.

Examples:
```Gherkin
Scenario: Unsuccessful login with invalid username
  Given I am a visitor
  When I log in from menu as customer blabla@blabla.com/password
  Then I should be a visitor
  And I should be told that I have provided wrong credentials blabla@blabla.com
  
Scenario: Successfully change my password and check re-login
  Given I have changed my password from password to newpassword
  When I log out
  And I log in from menu as customer john.doe@email.com/newpassword
  Then I should be customer John/Doe
```


##### Tags

Features and scenarios must be tagged. Tagging provides the ability to only run a subset of features and/or scenarios.
Tags can be set to features and scenarios by adding `@tagname` on the line prior to `Feature` or `Scenario` keywords.

The following tags are allowed:

* `@smoke` (on scenarios only): To tag scenarios that are the most important from a business point of view. The
objective is to run those scenarios before pushing any code to Stash and blocking the merge if some tests fail.
* `@nrt` (on features and/or scenarios): To tag features/scenarios that must be run every night to guarantee that 
developments from the previous day do not break any existing features.
* `@feature` (on features only): To tag features related to the same functional area. For example: `@registration`,
`@login`, etc. The objective is for the developer to be able to run tests related to the features he/she is updating to
guarantee that he/she does not break anything.

```Gherkin
@nrt @login
Feature: Login / Logout from the user menu

  @smoke
  Scenario: Successful login with valid credentials
    Given I am on the homepage
    And I am a visitor
    When I log in from menu as customer john.doe@email.com/password
    Then I should be customer John/Doe

  Scenario: Unsuccessful login with invalid username
    Given I am on the homepage
    And I am a visitor
    When I log in from menu as customer blabla@blabla.com/password
    Then I should be a visitor
    And I should be told that I have provided wrong credentials blabla@blabla.com
```

##### Gherkin structure and useful sentences

###### Given
Always set the context in the following order:
 * Set the page from where to start the test case (mandatory).
   * `I am on the homepage`
   * `I am on the registration page`
   * `I am on the my account addresses page`
   * ...
 * Set the user (mandatory).
   * `I am a visitor` => When I should be a visitor, meaning not logged in.
   * `I am a customer` => When I should be a customer, meaning logged in, with no specific configuration.
   * `I am a customer who xxx` => When I should be a customer with specific configuration.
     * `I am a customer who has registered 2 addresses`
     * `I am a customer with products in my cart`
     * ...
 * Set other specific pieces of context   

###### When
 * `I go to the xxx page`
   * `I go to the homepage`
   * `I go to the registration page`
   * `I go to the my account addresses page`
   * ...

###### Then
 * `I should be a visitor` => To assert that I should not be logged in.
 * `I should be a customer` => To assert that I should be logged in.


#### Step definitions

Cucumber.js code which matches Gherkin syntax with executable code.

Structure:
 * `Given` steps should contain actions to reach the required state for the test (functions that are action verbs) and
  assertions of those actions (functions starting with `see`)
 * `When` steps should only contain actions (functions that are action verbs)
 * `Then` steps should only contain assertions (functions starting with `see`)

Example:
```Javascript
this.Given(/^I am customer (.+)\/(.+)/, function (userName, password) {
    return browser
      .login({ usernameField: userName, passwordField: password })
      .seeCustomer();
  });
      
this.When(/^I log in as (.*)\/(.*)$/, function (userName, password) {
    return browser.login({ usernameField: userName, passwordField: password });
  });
  
this.Then(/^I am customer (.+)\/(.+)$/, function (firstName, lastName) {
    return browser.seeCustomerWithName(firstName, lastName);
  });
```

##### Must do

* Step definitions must only interact with business objects, not with page/component objects.
* Code must be intelligible, meaning readable by anybody. Thus, it should contain as few logic as possible. Most logic
 should be hidden as much as possible in business objects.
* Data must not be hard coded (use data files instead).
* Step definition should be asynchronous and return promises
  * More information about step definition and promises [here](https://github.com/cucumber/cucumber-js#promises).
  * Avoid using callback() as much as possible to keep consistency and better readability.
* Step definition must not contain any technical assertions (such as `.should.eventually.be...`, 
 `.should.eventually.equal...`), the business objects should.

  
**<font color="#FF6F6B">Bad</font>**
```Javascript
this.When(/^I register$/, function (callback) {
    browser
        .setValue('#ta-registration-firstName', 'Hillary')
        .setValue('#ta-registration-lastName', 'Trump')
        .click('#ta-continue-bottom');
    callback();
});
```

**<font color="#67F86F">Good</font>**
```Javascript
this.When(/^I register$/, function () {
    const dataObject = require('src/support/data/registration/fr-without-machine-registration-nor-welcome-offer.data');
    return browser.register(dataObject);
});
```

Second piece of code is intelligible, data are not hard coded, it interacts only with a Business object and returns a Promise.

#### Business objects

Objects that represent Nespresso core business.  
Methods should represent as close as possible Nespresso's business using the commonly used vocabulary.

Hide complexity of business processes such as registration which differs depending on the market and configuration.

Example of a Business object:
```Javascript
class Login {
  
    constructor(customerComponent) {
      ...  
    }
  
    // Action function
    login(data) {
      ...
    }

    // Assertion function
    seeCustomerWithName(firstName, lastName) {
      ...
    }
    ...
}
```

##### Must do

* Action function must be an action verb
* Assertion function must start with `see`
* Add commands to the `browser` via `addCommand` API to be able to easily chain promises in step definitions. More 
  information [here](http://webdriver.io/api/utility/addCommand.html).
* All technical assertions (such as `.should.eventually.be...`, `.should.eventually.equal...`) must be used in business
  objects only.
* Data must come from external parameter(s).
* Handle functional logging (See Logging section)

#### Page/Component objects

A page object represents a page and define elements to interact with (e.g. fields, buttons...) and possible actions
(e.g. submit form). A component object is similar to a page object but for transverse component such as login and cart
blocks available on most of pages.

##### Must do

* Page/Component objects must not contain any technical assertions (such as `.should.eventually.be...`,
 `.should.eventually.equal...`), the business objects should.
* Each page/component object must define a `pageElements` getter listing all the HTML elements that will be interacted
  with. Then, a change in the web interface (id field change for instance) will only require a change in the 
  `pageElements` getter. All the HTML elements must be accessed through `pageElements`.
* Functions returning the value of a page element must comply to the following naming convention: `getXXX`
* Functions returning whether an object is visible or not must comply to the following naming convention: `isXXXVisible`
* Functions just performing a single browser interaction must comply to the following naming convention:
  `clickXXXButton`, `clickXXXLink`, etc.
* Functions performing several browser interactions must start with an action verb: `deleteSecondaryAddress`, 
  `addAddress`, etc.

## Logging

Even though the tests are automatically executed, it is important to be able to re-run them manually if needed.
Especially for investigation in case of failure.

In order to do this, a log file is generated in `log/functional-logs.log` for each execution.
Note that the file is re-created for each execution to not be polluted by previous runs.

The logging is done at the Business Object level, meaning all `browser.addCommand` should include the following logging:
```javascript
logger.info('Functional explanation of is being executed.', {
    file: __filename, //This never changes
    method: 'browser.methodName',
  });
```

Here is an example:
```javascript
/**
 * @alias Cart.proceedToCheckout
 * @memberOf browser
 * @method proceedToCheckoutFromMiniCart
 */
browser.addCommand('proceedToCheckoutFromMiniCart', function () {
  logger.info('Click on the "Proceed to checkout" button from the mini cart.', {
    file: __filename,
    method: 'browser.proceedToCheckoutFromMiniCart',
  });
  return cart.proceedToCheckoutFromMiniCart();
});
```

To log data (that is used to fill in form for instance), you can use `JSON.stringify`:
```
/**
 * @alias FastRegistration.fastRegister
 * @memberOf browser
 * @method fastRegister
 */
browser.addCommand('fastRegister', function (data) {
  logger.info('Fast register with the following data:\n' + JSON.stringify(data, null, 2), {
    file: __filename,
    method: 'browser.fastRegister',
  });
  return fastRegistration.fastRegister(data);
});
```


## Helpers

### Additional browser commands

On top of browser commands provided by WebdriverIO, additional commands are available in
`src/support/browser-commands`. For instance: `fillInForm` to automatically fill a form from a data object,
`selectRadioButton`, etc.

### Faker

Faker library can be used to generate random and properly formatted data to fill in forms (see examples in
`src/support/data`).


## Technical Guidelines

### How to include modules

Thanks to the [app-module-path module](https://www.npmjs.com/package/app-module-path), all the paths are relative to
`functionalTests/`. For instance to include `functionalTests/src/support/helper/helper.js`from any other file, the syntax
is always the same:

`const helper = require('src/support/helper/helper');`


### Unit Tests

#### What should be unit tested
 * All configuration and helper modules
 * All business objects; however, not all single functions should be tested. It is useless to test functions with no
 logic such as:
 ```
seeVisitor() {
    return this.userComponent.isVisitor().should.eventually.be.true;
}

seeCustomer() {
    return this.userComponent.getLoggedUser().should.be.fulfilled;
}
```

But it is useful to test functions with logic such as:
```
seeCustomerWithName(firstName, lastName) {
    return this.userComponent.getLoggedUser()
        .then(function (user) {
            return Promise.all([
                user.firstname.should.equal(firstName),
                user.lastname.should.equal(lastName),
            ]);
        });
}
```

#### How to unit test

##### Spying, stubbing, mocking

An interesting [blog post](http://jaketrent.com/post/sinon-spies-vs-stubs/) detailing how to use spies, stubs and mocks.
with the [Sinon](http://sinonjs.org/) library.
> * Use Spies - if you simply want to watch and verify somethings happens in your test case.
> * Use Stubs - if you simply want to specify how something will work to help your test case.
> * Use Mocks - if you want to both of the above on a single dependency in your test case.

Always use sandbox to set and reset the context through `beforeEach` and `afterEach`:
```
let sandbox;

beforeEach(function () {
    sandbox = sinon.sandbox.create();
});

afterEach(function () {
    sandbox.restore();
});
```

##### Configuring IntelliJ to run unit tests
1. Install the `NodeJS` plugin
1. Update Mocha configuration to include the test-common file while running your tests. Go to Run >
Edit Configurations... > Defaults > Mocha and set the `Extra Mocha options` as follow:

![alt tag](resources/intellij-mocha-configuration.png)
