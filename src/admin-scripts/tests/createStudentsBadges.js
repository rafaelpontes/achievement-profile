// Code for initializing badges for students

var admin = require('firebase-admin');

var serviceAccount = require('path/to/configuration.json');

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://{yourproject}.firebaseio.com/'
});

var badgesKeys = [
    "daily-exerciser", "daily-exerciser-copper", "daily-exerciser-silver",
    "daily-exerciser-gold", "daily-exerciser-diamond", "exerciser-247",
    "exerciser-30", "persistent", "persistent-copper", "persistent-silver",
    "persistent-gold", "persistent-diamond", "persistent-savant",
    "competitor-copper", "competitor-silver", "competitor-gold",
    "competitor-platinum", "competitor-diamond", "unit-1", "unit-2", "unit-3",
    "unit-4", "unit-5", "unit-6", "unit-7", "unit-8", "unit-9", "unit-10",
    "collaborator", "collaborator-beginner", "collaborator-intermediate",
    "collaborator-advanced", "collaborator-expert", "collaborator-savant",
    "professional-approximator", "extra-badge"
];

var badges = {};

for(var i = 0; i < badgesKeys.length; i++) {
  var curBadge = {
    // key: badgesKeys[i],
    achieved: false,
    amount: 0,
    timestamps: []
  }
  badges[badgesKeys[i]] = curBadge;
  // badges.push(curBadge);
}

var db = admin.database();

var currentStudentEmail = "student@institute.edu";

const ssdb = db.ref("/students");

ssdb.orderByChild('email').equalTo(currentStudentEmail).once("value", function(snap) {
  var key = Object.keys(snap.val())[0];

  createBadgesField(key);

  return admin.app().delete();
});

function createBadgesField(key) {
  db.ref(`students/${key}/badges`).set(badges);
}

// console.log(studentRef.val);

/*

console.log("AISHDJIAUSHDIAUSHDAILSHDLAISUHLASIUHDAILSHALSIH");
console.log(studentRef.val());

if(studentRef) {
  studentRef.push(badges, function(error) {
    if(error) {
      console.log("Error: " + error);
    } else {
      console.log("Successfully created badges for student with e-mail "  + currentStudentEmail + ".");
    }
    return admin.app().delete();
  });
}
*/
