Feature: User association
  Test association of user with user groups, netgroups, roles, HBAC roles and
  Sudo rules

  Background:
    Given an administrator account named admin exists
    And I am logged in as admin
    * I click on "Member of" tab
    * I have a sample netgroup
    * I have a sample rbac
    * I have a sample hbac
    * I have a sample sudorule

  Scenario: # Enter scenario name here
    # Enter steps here
