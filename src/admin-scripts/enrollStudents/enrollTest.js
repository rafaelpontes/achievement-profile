// This is a script for testing cloud functions locally

var admin = require('firebase-admin');

var serviceAccount = require("path/to/serviceAccountKey.json");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://{yourproject}.firebaseio.com/'
});

var db = admin.database();

var enrolledRef = db.ref('enrolled_students');

var testStudent = {
  email: "login@institute.edu",
  login: "login",
  matricula: 123
};

enrolledRef.push(testStudent, error => {
  if(error) {
    console.log("There was an error saving to database.");
  } else {
    console.log("Student recorded on database successfully.");
  }
  return admin.app().delete();
});
