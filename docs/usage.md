Hi. These are some basic Instructions to setup this gamified system.
Author: Rafael Pontes

1) To get started, setup a new firebase project.
Instructions here: https://firebase.google.com/docs/web/setup

2) Enable Authentication (this project used "Google Account" to authenticate, but you have several options), Realtime Database, Cloud Messaging and Cloud Functions in your project.

3) Replace your "public" folder with the one at /src/firebase-project/public

4) Replace your "cloud functions" folder with /src/firebase-project/functions

5) Replace your database.rules.json and your firebase.json files with the ones in /src/firebase-project/

7) Go to the index.html file inside your public folder and replace the firebase project configuration parameters to match the one from your own created project.

8) There are many http cloud functions inside the index.js file from the functions directory. Replace the "localKey" variable inside them to some unique key of your choice to protect your system. // TODO: move this to a config file.

9) Set up the config variable in the file public/firebase-messaging-sw.js to match you firebase project's parameters. (This is the same as step 7)

10) Create an account in https://cron-job.org/ and set up jobs for the following cloud functions:

10.1) onDailyStatisticsResetByHttps should be set to be fired once everyday at 0:00 am

10.2) onLeaderboardBadgeByHttps once every week at 0:00 am of Monday.

10.3) onLeaderboardUpdateByHttps everytime you want to manually update the leaderboard (not necessary, because the system automates this). But if you have many students, and want to save resources from the server (and pay less at the end of the month), you could use this function to update the leaderboard every 15 minutes, one hour etc. However, you have to edit the code (the leaderboard updates everytime a student submits a correct assignment).

10.4) onWeeklyStatisticsResetByHttps this should be sent once every week at 0:00 am. This sets the week assignment counter of each students back to zero.

10.5) onMarathonBadgeByHttps this should be programmed to be sent at the time of conclusion of the initial marathon. This ends the marathon and sends the corresponding badges to the competition in the marathon. Note, however, that you have to edit the start and end time in the function code corresponding to the marathon duration.

The aforemetioned function is:

function isMarathonTime(time) {
      time = new Date(time);
      let begin = new Date(Date.UTC(year, month, day, hour, minute, second));
      let end = new Date(Date.UTC(year, month, day, hour + duration, minute, second));
      if (time > begin && time < end) {
        return true;
      }
      return false;
    }

You have to replace year, month, day, hour, minute, second and duration with your desired values for the start and end of marathon. It's recommended to test this functionality beforehand.

11) You have to program your online system to send an http request to the onSubmissionReceivedByHttps cloud function with the right key you set up before and a json array of objects with the following structure:

[
  {
    "student": email,
    "time": timestamp,
    "key": assignmentName,
    "aid": assignmentId
  },
  ...
]

Where email is the student's registered email, timestamp is a number with the same expected by the Date javascript object, assignmentName is a string identifying the assignment the student solved, and assignmentId is a number that uniquely identifies the submission.
