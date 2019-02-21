function getPreviousMonday(date) {
  if(!date) { date = new Date() }
  var day = date.getDay();
  var prevMonday;
  if(day === 1) {
      prevMonday = date;
  } else {
      prevMonday = new Date(
                      new Date().setDate(date.getDate() - day + 1)
                    );
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
      nextSunday = new Date(
        new Date().setDate(date.getDate() + (7 - day))
      );
  }
  nextSunday = new Date(nextSunday);
  nextSunday.setHours(23, 59, 59, 999)
  return nextSunday;
}

var today = new Date();
console.log(getPreviousMonday(today));
console.log(getNextSundayLimit(today));
console.log(today);
console.log(today.getDay());
