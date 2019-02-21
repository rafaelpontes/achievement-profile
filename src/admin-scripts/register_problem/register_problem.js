var admin = require('firebase-admin');

var serviceAccount = require('../../extra_files/keys/TST-Badges-f32a11700df9.json');

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tst-badges.firebaseio.com/'
});

var db = admin.database();
var ref = db.ref('events/problems_solved/');

var solved_problem = {
  key: 'pi-approx',
  student: 'rafaelgpontes1@gmail.com',
  // timestamp_firebase: firebase.database.ServerValue.TIMESTAMP,
  timestamp_now: Date.now()
}

ref.push(solved_problem)
  .then(function() {
    debug('Registered problem on db.');
    return admin.app().delete();
  }).catch(function() {
    debug("Error! ");
    return admin.app().delete();
  });

function debug(s) {
  console.log(s);
}
