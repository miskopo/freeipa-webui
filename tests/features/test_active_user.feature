Feature: User manipulation
  Create, edit, delete, preserve and activate users


  Background:
    Given I am logged in as "admin"
    Given I am on "active-users" page

  Scenario Outline: Add a new user
    When I click on "Add" button
    * I type in the field "User login" text "<userLogin>"
    * I type in the field "First name" text "<firstName>"
    * I type in the field "Last name" text "<lastName>"
    * I type in the field "New Password" text "<password>"
    * I type in the field "Verify password" text "<password>"
    * in the modal dialog I click on "Add" button
    Then I should see "<userLogin>" entry in the data table
    Examples:
      | userLogin | firstName | lastName | password             |
      | testuser1 | Arthur    | Dent     | ILoveKlingonPoetry42 |
      | testuser2 | Banana    | Bread    | FishAndChips097      |
      | testuser3 | Cypress   | Gateway  | TestingIsFun73       |


  Scenario: Delete a user
    Given I should see "testuser1" entry in the data table
    When I select entry "testuser1" in the data table
    And I click on "Delete" button
    Then I see "Remove active users" modal

    When in the modal dialog I check "Delete" radio selector
    And in the modal dialog I click on "Delete" button
    Then I should not see "testuser1" entry in the data table
