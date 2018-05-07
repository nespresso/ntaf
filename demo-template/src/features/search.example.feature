Feature: Search

  Scenario: Search for something that can be easily found
#    Given I am on the search page
    When I search for something that can be easily found
    Then I should see many results

  Scenario: Search for something that cannot be found
#    Given I am on the search page
    When I search for something that cannot be found
    Then I should see no result

  Scenario: Query is displayed along with results
#    Given I am on the search page
    When I search for something
    Then I should see the search query
