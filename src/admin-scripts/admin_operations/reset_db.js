// This deletes everything in a database.
// Use with caution!

var admin = require('firebase-admin');

var serviceAccount = require("path/to/serviceAccountKey.json");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://{youproject}.firebaseio.com/'
});

var db = admin.database();
var ref = db.ref("/");

ref.set({"blank": {"name": "Done"}})
.then(() => {
  return admin.app().delete();
})
