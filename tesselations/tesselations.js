const ORIGIN = -50;
const BOX_SIZE = 100;
const HALF_BOX_SIZE = BOX_SIZE/2;

const MIN_COORD = ORIGIN;
const MAX_COORD = ORIGIN + BOX_SIZE;

const MIN_INCREASE = MIN_COORD + HALF_BOX_SIZE;
const MAX_DECREASE = MAX_COORD - HALF_BOX_SIZE;

const MIN_BOUND = ORIGIN + 2;
const MAX_BOUND = (ORIGIN + BOX_SIZE) - 2;

const TILE_COLOR_A = "rgba(255, 72, 176, 0.6)";
const TILE_COLOR_B = "rgba(255, 72, 176, 0.4)";

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("tesselations");

  background(255);
  noStroke();

  // side points
  let topPoint = random(MIN_BOUND, MAX_BOUND);
  let rightPoint = random(MIN_BOUND, MAX_BOUND);
  let bottomPoint = random(MIN_BOUND, MAX_BOUND);
  let leftPoint = random(MIN_BOUND, MAX_BOUND);

  // get intersection point of lines
  let intersection = math.intersect([topPoint, MIN_COORD], [bottomPoint, MAX_COORD], [MIN_COORD, leftPoint], [MAX_COORD, rightPoint]);

  for (var i = 0; i < (windowHeight/BOX_SIZE) + 1; i++) {
    var box_offset_y = BOX_SIZE * i;

    for (var j = 0; j < (windowWidth/BOX_SIZE) + 1; j++) {
      // set tile color
      if (i%2 == 0 && j%2 == 0) { fill(TILE_COLOR_A); }
      else if (i%2 == 0 || j%2 == 0) { fill(TILE_COLOR_B); }
      else { fill(TILE_COLOR_A); }

      var box_offset_x = BOX_SIZE * j;

      // top left => bottom right
      beginShape();
      vertex(MIN_INCREASE + box_offset_x, MIN_INCREASE + box_offset_y);
      vertex((topPoint + HALF_BOX_SIZE) + box_offset_x, MIN_INCREASE + box_offset_y);
      vertex((intersection[0] + HALF_BOX_SIZE) + box_offset_x, (intersection[1] + HALF_BOX_SIZE) + box_offset_y);
      vertex(MIN_INCREASE + box_offset_x, (leftPoint + HALF_BOX_SIZE) + box_offset_y);
      endShape(CLOSE);

      // top right => bottom left
      beginShape();
      vertex(MAX_DECREASE + box_offset_x, MIN_INCREASE + box_offset_y);
      vertex((topPoint - HALF_BOX_SIZE) + box_offset_x, MIN_INCREASE + box_offset_y);
      vertex((intersection[0] - HALF_BOX_SIZE) + box_offset_x, (intersection[1] + HALF_BOX_SIZE) + box_offset_y);
      vertex(MAX_DECREASE + box_offset_x, (rightPoint + HALF_BOX_SIZE) + box_offset_y);
      endShape(CLOSE);

      // bottom right => top left
      beginShape();
      vertex(MAX_DECREASE + box_offset_x, MAX_DECREASE + box_offset_y);
      vertex((bottomPoint - HALF_BOX_SIZE) + box_offset_x, MAX_DECREASE + box_offset_y);
      vertex((intersection[0] - HALF_BOX_SIZE) + box_offset_x, (intersection[1] - HALF_BOX_SIZE) + box_offset_y);
      vertex(MAX_DECREASE + box_offset_x, (rightPoint - HALF_BOX_SIZE) + box_offset_y);
      endShape(CLOSE);

      // bottom left => top right
      beginShape();
      vertex(MIN_INCREASE + box_offset_x, MAX_DECREASE + box_offset_y);
      vertex((bottomPoint + HALF_BOX_SIZE) + box_offset_x, MAX_DECREASE + box_offset_y);
      vertex((intersection[0] + HALF_BOX_SIZE) + box_offset_x, (intersection[1] - HALF_BOX_SIZE) + box_offset_y);
      vertex(MIN_INCREASE + box_offset_x, (leftPoint - HALF_BOX_SIZE) + box_offset_y);
      endShape(CLOSE);
    }
  }
}
