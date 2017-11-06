@tag1
Feature: Form browser commands

  Scenario: fillInForm
    Given I am on the form browser commands page
    When I search for commands
    Then I should see filled in search details
