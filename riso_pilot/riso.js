const PAPER_WIDTH = 11;
const PAPER_HEIGHT = 17;
const SCALE = 45;

const CANVAS_WIDTH = PAPER_WIDTH*SCALE;
const CANVAS_HEIGHT = PAPER_HEIGHT*SCALE;

let img;

function preload() {
  img = loadImage("images/" + Math.round(random(4)) + ".jpg");
}

function setup() {
  pixelDensity(1);

  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent("riso");

  background(255);

  let circlesLayer = new Riso(random(RISOCOLORS).name);
  let ellipse_radius = random(25, 100);

  for (var i = 0; i < 25; i++) {
    circlesLayer.noStroke();
    circlesLayer.fill(random(255));
    circlesLayer.ellipse(random(CANVAS_WIDTH), random(CANVAS_HEIGHT), ellipse_radius, ellipse_radius);
  }

  let scale = Math.round(random(1,10));
  img.resize(img.width/scale, img.height/scale);

  let imageLayer = new Riso(random(RISOCOLORS).name);
  let dithered = ditherImage(img, "floydsteinberg");

  imageLayer.imageMode(CORNER);
  imageLayer.image(dithered, random(CANVAS_WIDTH - img.width), random(CANVAS_HEIGHT - img.height));

  drawRiso();
}
