Feature: User manipulation
  Create, edit, delete, preserve and activate users

  Background:
    Given an administrator account named admin exists
    And I am logged in as admin

  Scenario: Navigate to users tab
    When I click on Users tab
    And there is only one existing user
    Then I should see admin entry in the result table

  Scenario Outline: Add a new user
    Given I have a sample group
    * I have a sample netgroup
    * I have a sample rbac
    * I have a sample hbac
    * I have a sample sudorule
    When I click on Add button
    * I type in the field user-login text <username>
    * I type in the field first-name text <firstname>
    * I type in the field last-name text <lastname>
    * I click on "Add" button
    Then I should see <username> entry in the result table
    * Entry <username> should be enabled
    Examples:
      | username  | firstname | lastname
      | testuser1 | test      | user1
      | testuser2 | test      | user2
      | testuser3 | test      | user3


  Scenario: Open user details
    Given There is an entry testuser1
    When I open the details for the entry testuser1
    Then I should see the detail page for testuser1

  Scenario: Fill in user details
    Given There is an entry testuser1
    When I open the details for the entry testuser1
    * I type in the field first-name text Testfirst
    * I type in the field last-name text Testlast
    * I type in the field full-name text "Testfirst Testlast"
    * I type in the field job-title text Testjobtitle
    * I type in the field class-field text Testclass
    * I type in the field gecos text "Testfirst Testlast, RandomOffice, 1234567, The Earth"
    When I click on save button
    Then I should see the detail page for testuser1
    * I should see field first-name filled with Testfirst
    * I should see field last-name filled with Testlast
    * I should see field full-name filled with "Testfirst Testlast"
    * I should see field job-title filled with Testjobtitle
    * I should see field class-field filled with Testclass
    * I should see field gecos filled with "Testfirst Testlast, RandomOffice, 1234567, The Earth"

  Scenario: Add ssh key to a user
    Given There is an entry testuser1
    When I open details for entry testuser1
    * I click on add_ssh_key button
    * I type in the field ssh-key text "LONG SSH KEY HERE"
    * I click on set button
    Then I should see field "ssh_pubkey" filled with "SHORT_SSH_KEY_HERE"

  Scenario: Add certificate to a user
    Given There is an entry testuser1
    When I open details for entry testuser1
    * I click on add_certificate button
    * I type in the field certificate text "CR_CONTENT_HERE"
    * I click on set button
    Then I should see field "certificate" filled with "CR_CONTENT_HERE"

  Scenario: Add certificate mapping data to a user
    Given There is an entry testuser1
    When I open details for entry testuser1
    * I click on add_certificate_mapping button
    * I type in the field certificate_mapping text "CR MAPPING CONTENT"
    * I click on set button
    Then I should see field certificate_mapping filled with "CR MAPPING CONTENT"


