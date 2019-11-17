const RANDOM_IMAGE = true;
const IMG_NUM = 35;

const SCALE = 0.35;

const RANDOM_GRID_SIZE = true;
let num_of_x_strips = 60;

const X_ORIGIN = 0;
const Y_ORIGIN = 0;

// For debugging
const CUT_X = true;
const CUT_Y = true;

var img;

function preload() {
  if (RANDOM_IMAGE) {
    img = loadImage("images/" + Math.round(random(49)) + ".jpg");
  }
  else {
    img = loadImage("images/" + IMG_NUM + ".jpg");
  }
}

function setup() {
  let img_width = img.width*SCALE;
  let img_height = img.height*SCALE;

  if (RANDOM_GRID_SIZE) {
    num_of_x_strips = round(random(10, 80));
  }

  let grid_size = img_width/num_of_x_strips;
  let num_of_y_strips = floor(img_height/grid_size);

  let canvas = createCanvas(img_width, num_of_y_strips*grid_size);
  canvas.parent("four_grid_distortion");

  image(img, 0, 0, img_width, img_height);

  // Cut image into horizontal strips and re-draw collated
  if (CUT_X) {
    let x_strips = [];
    for (let i = 0 ; i < num_of_x_strips; i++) {
      let x_offset = i*grid_size + X_ORIGIN;
      x_strips.push(get(x_offset, Y_ORIGIN, grid_size, img_height));
    }

    background(255);

    for (let i = 0; i < x_strips.length; i++) {
      let x_offset = floor(i/2)*grid_size;

      if (i%2 != 0) {
        x_offset += grid_size*round(num_of_x_strips/2);
      }

      image(x_strips[i], x_offset, Y_ORIGIN, grid_size, img_height);
    }
  }

  // Cut image into vertical strips and re-draw collated
  if (CUT_Y) {
    let y_strips = [];
    for (let i = 0 ; i < num_of_y_strips; i++) {
      let y_offset = i*grid_size + Y_ORIGIN;

      if (y_offset + grid_size < img_height + Y_ORIGIN) {
        y_strips.push(get(X_ORIGIN, y_offset, img_width, grid_size));
      }
    }

    background(255);

    for (let i = 0; i < y_strips.length; i++) {
      let y_offset = floor(i/2)*grid_size;

      if (i%2 != 0) {
        y_offset += grid_size*round(num_of_y_strips/2);
      }

      image(y_strips[i], X_ORIGIN, y_offset, img_width, grid_size);
    }
  }
}

function keyPressed() {
  // Press "i" to save whole image
  if (keyCode === 73) {
    saveCanvas("four_grid_distortion", "png");
  }
}
