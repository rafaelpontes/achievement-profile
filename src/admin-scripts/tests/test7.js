function getPreviousMonday(date) {
  if(!date) { date = new Date() }
  var day = date.getDay();
  var prevMonday;
  if(day === 1) {
      prevMonday = date;
  } else {
      prevMonday = new Date(
                      date.getTime() - (day * 86400000) + 86400000
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
        date.getTime() + ((7 * 86400000) - (day * 86400000))
      );
  }
  nextSunday = new Date(nextSunday);
  nextSunday.setHours(23, 59, 59, 999)
  return nextSunday;
}

var d = new Date();
d.setDate(d.getDate() + 10);
var lm = getPreviousMonday(d);
var nd = getNextSundayLimit(d);

console.log(d);
console.log(lm);
console.log(nd);

if(d > lm && d < nd)  {
  console.log('ok');
} else {
  console.log('not ok');
}
