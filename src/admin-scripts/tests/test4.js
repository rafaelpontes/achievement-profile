function modify(ob) {
  ob.planet = "Earth";
}

var ob = {
  planet: "Mars"
};

modify(ob);

console.log(ob);
