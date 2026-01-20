@smoke
Feature: Login Functionality
  As a user
  I want to login to the application
  So that I can access secure pages

  Background:
    Given I am on the login page

  @positive
  Scenario: Successful login with valid credentials
    When I enter username "tomsmith"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see the secure area page
    And I should see a success message "You logged into a secure area!"

  @negative
  Scenario: Failed login with invalid username
    When I enter username "invaliduser"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see an error message "Your username is invalid!"
    And I should remain on the login page

  @negative
  Scenario: Failed login with invalid password
    When I enter username "tomsmith"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message "Your password is invalid!"
    And I should remain on the login page

  @negative
  Scenario: Failed login with empty credentials
    When I click the login button
    Then I should see an error message "Your username is invalid!"
    And I should remain on the login page

  @negative
  Scenario: Login with special characters in username
    When I enter username "user@123!"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see an error message "Your username is invalid!"

  @fail @skip
  Scenario: Intentional failing test for demonstration
    When I enter username "tomsmith"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should see a success message "This message will never appear"
    And I should remain on the login page
