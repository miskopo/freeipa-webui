const { Given, When, Then } = require("cucumber");

Given(
  "an administrator account named {word} exists",
  function (admin_account_exists) {
    console.log("Admin exists, SUCCESS");
  }
);

Given("I am logged in as {word}", function (admin_login) {
  console.log("Admin logged in, SUCCESS");
});

When("I login as an entry {word}", function (login) {});
When("I logout", function (logout) {});

Given("I have a sample {word}", function (create_record) {});

When("I click on {} tab", function (tab_name) {
  document.getElementById(tab_name).click();
});

When("I click on {word} button", function (button_name) {
  document.getElementById(button_name).click();
});

When("there is only one existing user", function () {});

Then("I should see {word} entry in the result table", function (entry_id) {});
When("I type in the field {word} text {}", function (field_id, content) {});
Given("There is an entry {word}", function (entry_id) {});
When("I open details for entry {word}", function (entry_id) {});
Then(
  "I should see field {word} filled with {}",
  function (field_id, content) {}
);
When("I open the details for the entry {word}", function () {});
Then("I should see the detail page for {word}", function () {});
Then("Entry {word} should be enabled", function () {});

When("Navigate to record {word}", function (navigate_to_record) {});
When("Navigate to entity {word}", function (navigate_to_entity) {});

When("Modify record {word}", function (mod_record) {});

When("I add user {word} to group {word}", function (add_user_to_group) {});
When("I set {word} for entry {word}", function (set_password_policy) {});
When(
  "I reset password for entry {word} with password {word}",
  function (reset_password_action) {}
);

When("I do profile menu action {word}", function (profile_menu_action) {});
When(
  "I fill password dialog with password {word}",
  function (fill_password_dialog) {}
);
Then("Password should be reset", function () {});
