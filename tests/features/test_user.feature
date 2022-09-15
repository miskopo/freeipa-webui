Feature: User manipulation
  Create, edit, delete, preserve and activate users

  Background:
    Given an administrator account named "admin" exists
    And I am logged in as "admin"

  Scenario: Navigate to users tab
    When I click on "Users" tab
    And there is only one existing user
    Then I should see "admin" user in the list

