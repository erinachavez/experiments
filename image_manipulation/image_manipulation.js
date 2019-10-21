// 8.5" x 11", 300 dpi
const PAPER_WIDTH = 2550;
const PAPER_HEIGHT = 3300;
const PAPER_BORDER = 150;

const RANDOM_IMAGE = true;
const IMG_NUM = 35;

const RANDOM_GRID_SIZE = true;
let num_of_x_strips = 45;

const TILE_BORDER = 0;

const GRAYSCALE_TILES = [];
const NUM_GRAYSCALE_TILES = 3;

const ENLARGED_TILE_BORDER = 30;

// For debugging
const CUT_X = true;
const CUT_Y = true;

let img;

function preload() {
  if (RANDOM_IMAGE) {
    img = loadImage("images/" + Math.round(random(49)) + ".jpg");
  }
  else {
    img = loadImage("images/" + IMG_NUM + ".jpg");
  }
}

function setup() {
  let canvas = createCanvas(PAPER_WIDTH, PAPER_HEIGHT);
  canvas.parent("image_manipulation");

  background(255);

  let img_width;
  if (img.width > img.height) {
    img_width = PAPER_WIDTH - PAPER_BORDER*2;
  }
  else {
    img_width = (PAPER_WIDTH - PAPER_BORDER*2)*.75;
  }

  let img_height = (img_width*img.height)/img.width;

  if (RANDOM_GRID_SIZE) {
    num_of_x_strips = round(random(5, 30));
  }

  let enlarged_tile_scale = num_of_x_strips/5

  let grid_size = img_width/num_of_x_strips;
  let num_of_y_strips = floor(img_height/grid_size);

  let img_x = PAPER_WIDTH/2;
  let img_y = PAPER_HEIGHT/2;

  imageMode(CENTER);
  image(img, img_x, img_y, img_width, img_height);
  imageMode(CORNER);

  let x_origin = img_x - img_width/2;
  let y_origin = img_y - img_height/2;

  // Cut image into horizontal strips and re-draw reversed
  if (CUT_X) {
    let x_strips = [];
    for (let i = 0 ; i < num_of_x_strips; i++) {
      let x_offset = i*grid_size + x_origin;
      x_strips.push(get(x_offset, y_origin, grid_size, img_height));
    }

    background(255);

    x_strips.reverse();
    for (let i = 0; i < x_strips.length; i++) {
      let x_offset = i*grid_size + x_origin;
      image(x_strips[i], x_offset, y_origin, grid_size, img_height);
    }
  }

  // Cut image into vertical strips and re-draw reversed
  if (CUT_Y) {
    let y_strips = [];
    for (let i = 0 ; i < num_of_y_strips; i++) {
      let y_offset = i*grid_size + y_origin;

      if (y_offset + grid_size < img_height + y_origin) {
        y_strips.push(get(x_origin, y_offset, img_width, grid_size));
      }
    }

    background(255);

    y_strips.reverse();
    for (let i = 0; i < y_strips.length; i++) {
      let y_offset = i*grid_size + y_origin;
      image(y_strips[i], x_origin, y_offset, img_width, grid_size);
    }
  }

  // Need to recalculate height because of cut off
  img_height = grid_size*num_of_y_strips;

  if (CUT_X && CUT_Y) {
    // Capture each individual tile
    let img_tiles = []
    for (var i = 0; i < num_of_y_strips; i++) {
      let y_offset = i*grid_size + y_origin;

      for (var j = 0; j < num_of_x_strips; j++) {
        let x_offset = j*grid_size + x_origin;
        img_tiles.push(get(x_offset, y_offset, grid_size, grid_size));
      }
    }

    background(255);

    // Recalculate image origin for tile border and enlarged tiles offset
    if (img_width > img_height) {
      x_origin = PAPER_WIDTH/2 - (img_width + num_of_x_strips*TILE_BORDER)/2;
      y_origin = PAPER_HEIGHT/2 - (img_height + (num_of_y_strips*TILE_BORDER) + (grid_size*enlarged_tile_scale) + ENLARGED_TILE_BORDER)/2;
    }
    else {
      x_origin = PAPER_WIDTH/2 - (img_width + (num_of_x_strips*TILE_BORDER) + (grid_size*enlarged_tile_scale) + ENLARGED_TILE_BORDER)/2;
      y_origin = PAPER_HEIGHT/2 - (img_height + num_of_y_strips*TILE_BORDER)/2;
    }

    // Convert some tiles to grayscale
    let grayscale_tile_coords = [];
    if (GRAYSCALE_TILES.length > 0) {
      grayscale_tile_coords = GRAYSCALE_TILES;
    }
    else if (NUM_GRAYSCALE_TILES > 0) {
      for (let i = 0; i < NUM_GRAYSCALE_TILES; i++) {
        grayscale_tile_coords.push([round(random(num_of_x_strips - 1)), round(random(num_of_y_strips - 1))]);
      }
    }

    // Redraw tiles to apply borders and grayscale
    let large_tiles = [];
    for (var i = 0; i < num_of_y_strips; i++) {
      let y_offset = y_origin + (i*grid_size) + (i*TILE_BORDER);

      for (var j = 0; j < num_of_x_strips; j++) {
        let x_offset = x_origin + (j*grid_size) + (j*TILE_BORDER);

        for (let k = 0; k < grayscale_tile_coords.length; k++) {
          if (grayscale_tile_coords[k][0] == j && grayscale_tile_coords[k][1] == i) {
            let tile = img_tiles[0];
            let t_width = tile.width;
            let t_height = tile.height;

            let large_tile = createImage(t_width, t_height);
            large_tile.copy(tile, 0, 0, t_width, t_height, 0, 0, t_width, t_height);
            large_tiles.push(large_tile);

            img_tiles[0] = grayscale(tile);
          }
        }

        image(img_tiles[0], x_offset, y_offset, grid_size, grid_size);
        img_tiles.shift();
      }
    }

    // Draw enlarged tiles
    for (let i = 0; i < large_tiles.length; i++) {
      let enlarged_grid_size = grid_size*enlarged_tile_scale;

      let x_offset, y_offset;
      if (img_width > img_height) {
        x_offset = x_origin + ENLARGED_TILE_BORDER*i + enlarged_grid_size*i;
        y_offset = y_origin + img_height + (num_of_y_strips*TILE_BORDER) + ENLARGED_TILE_BORDER;
      }
      else {
        x_offset = x_origin + img_width + (num_of_x_strips*TILE_BORDER) + ENLARGED_TILE_BORDER;
        y_offset = y_origin + ENLARGED_TILE_BORDER*i + enlarged_grid_size*i;
      }

      image(large_tiles[i], x_offset, y_offset, grid_size*enlarged_tile_scale, grid_size*enlarged_tile_scale);
    }
  }
}

function keyPressed() {
  // Press "s" to save image
  if (keyCode === 83) {
    saveCanvas("download", "png");
  }
}

// Helper function to convert an image to grayscale
function grayscale(img) {
  img.loadPixels();

  for (let i = 0; i < 4 * (img.width * img.height); i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let a = img.pixels[i + 3];

    let avg = (r + g + b)/3;

    img.pixels[i] = avg;
    img.pixels[i + 1] = avg;
    img.pixels[i + 2] = avg;
    img.pixels[i + 3] = a;
  }

  img.updatePixels();
  return img;
}

// Shuffle array helper function from: https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, tempValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
}
