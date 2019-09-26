var resolution;
var rad = 5;
var x = 1;
var y = 1;

var t = 0; // time passed
var tChange = 0.02; // how quick time flies

var nVal; // noise value
var nInt = 1; // noise intensity
var nAmp = 1; // noise amplitude

var imageCount = 4;

var colorNoise = 0;

var backgroundColor = 255;


function setup() {
  createCanvas(windowWidth, windowHeight);

  background(backgroundColor);

  noiseDetail(50);
  noFill();
  strokeWeight(1);

  resolution = random(25, 100); // how many points in the circle
}

function draw() {
  translate(width / 2, height / 2);
}

function keyPressed() {
  if (key == ' ') {
    nInt = map(450, 0, width, 0.1, 30); // map mouseX to noise intensity
    nAmp = map(400, 0, height, 0.0, 1.0); // map mouseY to noise amplitude

    beginShape();

    stroke(map(noise(colorNoise), 0, 1, 0, 255)); // gradient

    colorNoise += 0.1;
    for (var a = 0; a <= TWO_PI; a += TWO_PI / resolution) {
      // map noise value to match the amplitude
      nVal = map(noise(cos(a) * nInt + 1, sin(a) * nInt + 1, t), 0.0, 1.0, nAmp, 1.0);

      x = cos(a) * rad * nVal;
      y = sin(a) * rad * nVal;
      vertex(x, y);
    }
    endShape(CLOSE);

    t += tChange;
    rad += 5;
  }

  if (key == 'c') {
    background(backgroundColor);
  }

  if (key == 'i') {
    switch (backgroundColor) {
      case 255:
        backgroundColor = 0;
        document.body.style.backgroundColor = "#000";
        break;
      default:
        backgroundColor = 255;
        document.body.style.backgroundColor = "#fff";
    }

    reset();
  }

  if (key == 'r') {
    reset();
  }
}

function reset() {
  background(backgroundColor);

  resolution = random(25, 150);
  rad = 5;
}
