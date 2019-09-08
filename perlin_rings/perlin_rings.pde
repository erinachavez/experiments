float resolution = random(25,100); // how many points in the circle
float rad = 5;
float x = 1;
float y = 1;

float t = 0; // time passed
float tChange = 0.02; // how quick time flies

float nVal; // noise value
float nInt = 1; // noise intensity
float nAmp = 1; // noise amplitude

int imageCount = 1;

float colorNoise = 0;

int backgroundColor = 255;


void setup() {
  size(750,750);

  background(backgroundColor);

  noiseDetail(50);
  noFill();
  strokeWeight(1);
}

void draw() {
  translate(width/2, height/2);
}

void keyPressed(){
  if (key == ' '){
    nInt = map(450, 0, width, 0.1, 30); // map mouseX to noise intensity
    nAmp = map(400, 0, height, 0.0, 1.0); // map mouseY to noise amplitude

    beginShape();

    stroke(map(noise(colorNoise),0,1,0,255)); // gradient

    colorNoise += 0.1;
    for (float a = 0; a <= TWO_PI; a += TWO_PI/resolution) {
      // map noise value to match the amplitude
      nVal = map(noise(cos(a)*nInt+1, sin(a)*nInt+1, t), 0.0, 1.0, nAmp, 1.0);

      x = cos(a)*rad *nVal;
      y = sin(a)*rad *nVal;
      vertex(x,y);
    }
    endShape(CLOSE);

    t += tChange;
    rad += 5;
  }

  if (key == 'c') {
    background(backgroundColor);
  }

  if (key == 'i') {
    switch(backgroundColor) {
      case 255:
        backgroundColor = 0;
        break;
      default:
        backgroundColor = 255;
    }

    reset();
  }

  if (key == 'r') {
    reset();
  }
}

void reset() {
  background(backgroundColor);
  resolution = random(25,150);
  rad = 5;
}
