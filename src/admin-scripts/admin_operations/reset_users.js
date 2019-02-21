// This code should delete all students from the db.
// Note: untested!

var admin = require('firebase-admin');

var serviceAccount = require("path/to/serviceAccountKey.json");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://{yourproject}.firebaseio.com/'
});

var promises = [];

function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log("Deleting user: ", userRecord.toJSON());
        promises.push(admin.auth().deleteUser(userRecord.uid))
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();
Promise.all(promises)
  .then(function() {
    console.log("Successfully deleted users");
  })
  .catch(function(error) {
    console.log("Error deleting user:", error);
  })
