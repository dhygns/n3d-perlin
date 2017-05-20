import Perlin from "../index.js"

var prevtime = 0;
var currtime = 0;

var perlin = new Perlin();
console.log(perlin);

(function update() {
  prevtime = currtime;
  currtime = new Date() * 0.001;
  var dt = currtime - prevtime;
  if(dt < 0) dt = 0.0;

  perlin.update(dt);
  perlin.renderForDebug();
  requestAnimationFrame(update);
}).call(this)
