Feature: Test search box

Scenario: Search word with result ok
 Given I'm in the page of search
 When I to write a word to search with result ok
 Then The result is ok

Scenario: Search word with result fail
  Given I'm in the page of search
  When I to write a word to search with result fail
  Then The result is not ok

  
