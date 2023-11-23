import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = "/ipa/modern_ui";
// navigation
Given("I am on {string} page", (handle) => {
  cy.url().then(($url) => {
    if (!$url.includes(handle)) {
      cy.visit(BASE_URL + "/" + handle);
    }
  });
});

// login
function loginAsAnUser(username, password) {
  // temporary solution as the new UI doesn't have login page yet
  cy.visit("/ipa/ui");
  cy.get("[id=username1]").type(username);
  cy.get("[id=password2").type(password);
  cy.get("button[name=login]").click();
  cy.wait(1000);
  cy.visit(BASE_URL);
}
Given("I am logged in as {string}", (username) => {
  // temporary solution as the new UI does not show currently logged-in user
  cy.url().then(($url) => {
    if (!$url.includes("/ipa/modern_ui")) {
      loginAsAnUser(username, "Secret123");
    }
  });
});

When("I log in as {string} with password {string}", (username, password) => {
  loginAsAnUser(username, password);
});

When("I logout", () => {});

// Side menu
When("I open the side menu", () => {
  cy.get('[id="nav-toggle"]').then(($ele) => {
    if ($ele.attr("aria-expanded") === "false") {
      $ele.trigger("click");
    }
  });
});

When("I close the side menu", () => {
  cy.get('[id="nav-toggle"]').then(($ele) => {
    if ($ele.attr("aria-expanded") === "true") {
      $ele.trigger("click");
    }
  });
});

// Butons and tabs
When("I click on {string} tab", (tabText) => {
  cy.get("nav a").contains(tabText).click();
});

When("I click on {string} button", function (buttonText) {
  cy.get("button").contains(buttonText).click();
});

// Modals
When("in the modal dialog I click on {string} button", function (buttonText) {
  cy.get("[role=dialog] button").contains(buttonText).click();
});

When("in the modal dialog I check {string} radio selector", (selectorText) => {
  cy.get("[role=dialog] input[type=radio]+label")
    .contains(selectorText)
    .click();
});

Then("I see {string} modal", (modalHeading) => {
  cy.get("[role=dialog] h1 span").contains(modalHeading);
});

// Fields
When("I type in the field {string} text {string}", (fieldName, content) => {
  cy.get("[role=dialog] label")
    .contains(fieldName)
    .parent()
    .then(($label) => {
      cy.get("[name=modal-form-" + $label.attr("for") + "]").type(content);
    });
});

// Data tables
When("I select entry {string} in the data table", (name) => {
  cy.get("tr[id=" + name + "] input[type=checkbox]").check();
});

Then("I should see {string} entry in the data table", (name) => {
  cy.get("tr[id=" + name + "]").should("be.visible");
});

Then("I should not see {string} entry in the data table", (name) => {
  cy.get("tr[id=" + name + "]").should("not.exist");
});
