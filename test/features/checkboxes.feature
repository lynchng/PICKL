@smoke
Feature: Checkbox Interactions
  As a user
  I want to interact with checkboxes
  So that I can select and deselect options

  Background:
    Given I am on the checkboxes page

  @positive
  Scenario: Verify initial checkbox states
    Then checkbox 1 should be unchecked
    And checkbox 2 should be checked

  @positive
  Scenario: Check an unchecked checkbox
    When I check checkbox 1
    Then checkbox 1 should be checked

  @positive
  Scenario: Uncheck a checked checkbox
    When I uncheck checkbox 2
    Then checkbox 2 should be unchecked

  @positive
  Scenario: Toggle multiple checkboxes
    When I check checkbox 1
    And I uncheck checkbox 2
    Then checkbox 1 should be checked
    And checkbox 2 should be unchecked

  @regression
  Scenario: Toggle checkbox multiple times
    When I check checkbox 1
    And I uncheck checkbox 1
    And I check checkbox 1
    Then checkbox 1 should be checked
