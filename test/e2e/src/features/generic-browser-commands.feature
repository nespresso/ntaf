Feature: Generic browser commands

  Scenario: getNumberOfElements
    Given I am on the home page
    When I go to the generic browser commands page
    Then I should see 3 commands

  Scenario: clickFirstElement
    Given I am on the generic browser commands page
    When I go to the first command
    Then I should see "My Generic Browser Command #1" command title

  Scenario: clickLastElement
    Given I am on the generic browser commands page
    When I go to the last command
    Then I should see "My Generic Browser Command #3" command title

  Scenario: clickNthElement
    Given I am on the generic browser commands page
    When I go to the second command
    Then I should see "My Generic Browser Command #2" command title

  Scenario: waitForAllVisible
    Given I am on the generic browser commands page
    When I go to the first command
    Then I should see all sections

  Scenario: scrollAndClick
    Given I am on the scroll and click page
    When I fill in the command
    And I save the command
