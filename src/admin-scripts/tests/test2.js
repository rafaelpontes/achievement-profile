var today = new Date();
console.log(today);
today.setHours(23, 59, 59, 999);
console.log(today.getDay());



// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// test it
var a = new Date("2017-07-01"),
    b = new Date("2017-07-25"),
    difference = dateDiffInDays(a, b);
    console.log(difference);
