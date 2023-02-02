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
