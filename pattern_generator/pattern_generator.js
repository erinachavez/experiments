let tl,tr,bl,br;

var canvas1 = function(c1) {
  c1.setup = function() {
    c1.createCanvas(500, 500);
    c1.background(220);

    c1.noStroke();

    for (var i=0; i < 5; i++) {
      c1.fill(c1.random(255), c1.random(255), c1.random(255));
      var diameter = c1.random(50, 150);
      c1.ellipse(c1.random(80, 420), c1.random(80, 420), diameter, diameter);
    }

    tl = c1.get(0, 0, 250, 250);
    tr = c1.get(250, 0, 250, 250);
    br = c1.get(0, 250, 250, 250);
    bl = c1.get(250, 250, 250, 250);

    generateTile(tl, tr, br, bl);
  };
};
var myp5 = new p5(canvas1, "c1");

function generateTile(tl, tr, br, bl) {
  var canvas2 = function(c2) {
    c2.setup = function() {
      c2.createCanvas(500, 500);
      c2.background(220);
      c2.noStroke();

      c2.image(tl, 250, 250);
      c2.image(tr, 0, 250);
      c2.image(br, 250, 0);
      c2.image(bl, 0, 0);

      for (var i=0; i < 5; i++) {
        c2.fill(c2.random(255), c2.random(255), c2.random(255));
        var diameter = c2.random(50, 150);
        c2.ellipse(c2.random(80, 420), c2.random(80, 420), diameter, diameter);
      }

      tile = c2.get(0, 0, 500, 500);
      generatePattern(tile);
    };
  };
  var myp5 = new p5(canvas2, "c2");
}

function generatePattern(tile) {
  var canvas3 = function(c3) {
    c3.setup = function() {
      c3.createCanvas(1050, 500);

      for (var i=0; i < 1050; i++) {
        if (i%100 == 0) {
          for (var j=0; j < 500; j++) {
            if (j%100 == 0) {
              c3.image(tile, i, j, 100, 100);
            }
          }
        }
      }
    };
  };
  var myp5 = new p5(canvas3, "c3");
}
