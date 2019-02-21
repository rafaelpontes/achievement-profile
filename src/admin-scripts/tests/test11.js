var counters = [1, 2, 3, 4];
console.log("");
for (var i = 0; i < 4; i++) {
  setTimeout(function(asd) {
    console.log("Recebi este i: " + asd);
  }.bind(this, i), i*1000);
}
