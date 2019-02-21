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

for (var i = -10; i < 20; i++) {
  var psDate = new Date(new Date().getTime() + (i * 86400000));
  var psDateLabel = getDateLabel(psDate);
  var psDateWeekLabel = getDateWeekLabel(psDate);
  console.log("=====================================");
  console.log("psDateLabel: " + psDateLabel);
  console.log("psDateWeekLabel: " + psDateWeekLabel);
  console.log("=====================================");
}
