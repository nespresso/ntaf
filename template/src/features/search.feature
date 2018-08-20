Feature: Search Engine

  Scenario: I search an item that doesn't exist
    Given I am at the search page
    When I search for an item that does not exist
    Then I should be informed that no items are available

  Scenario: I search an item that does exist
    Given I am at the search page
    When I search for an item that does exist
    Then I should see some items