function getPreviousMonday() {
  var date = new Date();
  var day = date.getDay();
  var prevMonday;
  if(date.getDay() === 0) {
      prevMonday = new Date().setDate(date.getDate() - 7);
  } else{
      prevMonday = new Date().setDate(date.getDate() - day);
  }
  prevMonday = new Date(prevMonday);
  prevMonday.setHours(0, 0, 0, 0);
  return prevMonday;
}

console.log(getPreviousMonday());
