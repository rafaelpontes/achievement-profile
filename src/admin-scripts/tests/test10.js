function getDateLabel(date) {
  // Function that returns a string in the form 'YYYYMMdd'
  return date.getFullYear() +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          ("0" + date.getDate()).slice(-2);
}

function getDateWeekLabel(date) {
  var previousMondayLabel = getDateLabel(getPreviousMonday(date));
  var nextSundayLabel = getDateLabel(getNextSundayLimit(date));
  return (previousMondayLabel + '-' + nextSundayLabel);
}

function getPreviousMonday(date) {
  if(!date) { date = new Date() }
  var day = date.getDay();
  var prevMonday;
  switch (day) {
    case 0:
      prevMonday = new Date(date.getTime() - (6 * 86400000));
      break;
    case 1:
      prevMonday = date;
      break;
    default:
      prevMonday = new Date(date.getTime() + ((1 - day) * 86400000));
      break;
  }
  prevMonday.setHours(0, 0, 0, 0);
  return prevMonday;
}

function getNextSundayLimit(date) {
  if(!date) { date = new Date() }
  var day = date.getDay();
  var nextSunday;
  const sundayCode = 0;
  if(day === sundayCode) {
      nextSunday = date;
  } else {
      nextSunday = new Date(date.getTime() + ((7 - day) * 86400000));
  }
  nextSunday = new Date(nextSunday);
  nextSunday.setHours(23, 59, 59, 999);
  return nextSunday;
}

for (var i = 0; i < 2; i++) {
  var psDate = new Date(new Date().getTime() + (i * 86400000));
  var psDateLabel = getDateLabel(psDate);
  var psDateWeekLabel = getDateWeekLabel(psDate);
  console.log("=====================================");
  console.log("psDateLabel: " + psDateLabel);
  console.log("psDateWeekLabel: " + psDateWeekLabel);
  console.log("=====================================");
}


var ps = {
  pid: 'pi',
  sid: 'rafael@rafael.com',
  time: psDate.getTime()
};

var problemAndTime = {
  pid: 'pi',
  time: psDate.getTime()
};
var student = {};
student['daily_statistics'] = {};

//
// student.daily_statistics['daily_history'] = {};
// student.daily_statistics.daily_history[psDateLabel] = [problemAndTime];
// student.daily_statistics.daily_history[psDateLabel].push(problemAndTime);
// student.daily_statistics.daily_history[psDateLabel].push(problemAndTime);
// student.daily_statistics.daily_history[psDateLabel].push(problemAndTime);
// var s = JSON.stringify(student);
// console.log("s: " + s);


if (student.daily_statistics.hasOwnProperty('daily_history')) {
  // If student has daily_history property, append new problem

  if (student.daily_statistics.daily_history.hasOwnProperty(psDateLabel)) {
    // If another problem was submitted on the same day, append new problem
    student.daily_statistics.daily_history.push(problemAndTime);
  } else {
    // Else, this is the first problem submitted on that day.

    // Create a new node for that day and add the problem to that day
    student.daily_statistics.daily_history[psDateLabel] = [problemAndTime];
  }
} else {
  // Else, this is the first time a problem is registered ever!

  // Add daily_history node as a new Object, because each date node will be add as a property
  student.daily_statistics.daily_history = {};

  // Then, declare a new property inside daily_history that receives a list with the first problem in that day.
  student.daily_statistics.daily_history[psDateLabel] = [];
  student
    .daily_statistics
    .daily_history[psDateLabel]
    .push(problemAndTime);
}

var s = JSON.stringify(student);
console.log("s: " + s);


console.log("\nBegining of weekly code:");
console.log("===========================\n");

var lastDate = new Date(new Date().getTime() + (0 * 86400000));

// Calculates Moday 0 a.m. that precedes last submission's timestamp
var lastDateMondayBegin = getPreviousMonday(lastDate);

// Calculates last milisec of Sunday after last submission
var lastDateSundayEnd = getNextSundayLimit(lastDate);

// Making a timestamp object based on problem submission
// var psDate = psDate;

// Retrieve label with reference to week
var psDateWeekLabel = getDateWeekLabel(psDate);

var problemAndTime = { problemid: ps.pid, timestamp: ps.time };
student['weekly_statistics'] = {};
if (student.weekly_statistics.hasOwnProperty('weekly_history')) {
  // If student has weekly_problems property, append new problem
  if (student.weekly_statistics.weekly_history.hasOwnProperty(psDateWeekLabel)) {
    // If another problem was submitted on the same day, append new problem
    student.weekly_statistics.weekly_history[psDateWeekLabel].push(problemAndTime);
  } else {
    // Else, this is the first problem submitted on that week.

    // Create a new node for that week and add the problem to it
    student.weekly_statistics.weekly_history[psDateWeekLabel] = [problemAndTime];
  }
} else {
  // Else, this is the first time a problem is registered ever!

  // Create a new node for weekly_history
  student.weekly_statistics.weekly_history = {};
  student.weekly_statistics.weekly_history[psDateWeekLabel] = [problemAndTime];
}

if (psDate > lastDateMondayBegin && psDate < lastDateSundayEnd) {
  // If true, solved problem within last submission
  // week's constraints, so you can increase weekly status
  student.weekly_statistics.weekly_solved_current += 1;

  // If current value greater than record, update record
  if (student.weekly_statistics.weekly_solved_current > student.weekly_statistics.weekly_solved_record) {
    student.weekly_statistics.weekly_solved_record = student.weekly_statistics.weekly_solved_current;
  }
} else {
  // Else, submitted one or more weeks later.
  // Set weekly counters to 1.
  student.weekly_statistics.weekly_solved_current = 1;
  if (student.weekly_statistics.weekly_solved_current < 1) {
    student.weekly_statistics.weekly_solved_record = 1;
  }
}
// End of updateWeeklyAmounts

s = JSON.stringify(student, null, 2);
console.log("Final s: ");
console.log(s);
// test(student)
