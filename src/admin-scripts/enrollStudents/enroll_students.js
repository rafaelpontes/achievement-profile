// This is a code for registering students emails on db.
// This allows students to sign in in the platform.
// Sometimes the script would not register all students at once. I had to manually check which ones were not enrolled to re-enroll them.
// Perhaps this needs some further testing.

var admin = require('firebase-admin');

var serviceAccount = require("path/to/serviceAccountKey.json");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://{yourproject}.firebaseio.com/'
});

var db = admin.database();
var ref = db.ref("/enrolled_students");

// ADD STUDENTS' EMAILS YOU WANT TO ENROLL HERE.
// var studentsToEnroll = [
// ];

var studentsToEnroll =
[
  "example@gmail.com"
]

// Promises from add operations.
var enrollPromises = [];

for (var student in studentsToEnroll) {
  let curStudent = {
    email: studentsToEnroll[student]
  }
  enrollPromises.push(ref.orderByChild('email')
    .equalTo(curStudent.email)
    .once('value', snap => {
      if (snap.val()) {
        debug('User is already enrolled.')
        return curStudent;
      } else {
        debug(`Enrolling ${curStudent.email}.`)
        return ref.push(curStudent);
      }
  }))
}

Promise.all(enrollPromises).then(() => {
  return admin.app().delete();
});

var onComplete = function(error) {
    if(error) {
      debug("Error when saving to database.");
    } else {
      debug("Data saved successfully!");
    }
};

function debug(m) {
  console.log(m);
}
