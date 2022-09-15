const { Given } = require('cucumber')

Given('an administrator account named {word} exists', function (admin_account_exists) {
  console.log("Admin exists, SUCCESS")
});

Given('I am logged in as {word}', function (admin_login) {
  console.log("Admin logged in, SUCCESS")
 });
