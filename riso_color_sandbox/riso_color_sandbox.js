const CANVAS_WIDTH = 750;
const CANVAS_HEIGHT = 750;

const NUM_OF_COLORS = RISOLAB_COLORS.length;

const ELLIPSE_SIZE = 150;

let layers = {};

let currentLayer;
let currentFill = 255;

function setup() {
  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent("riso_color_sandbox");

  background(255);

  // Prepare layers
  for (let i = 0; i < NUM_OF_COLORS; i++){
    layers[RISOLAB_COLORS[i].name] = new Riso(RISOLAB_COLORS[i].name);
  }

  updateButtonColors();

  currentLayer = layers[RISOLAB_COLORS[0].name];
  risoNoStroke();
}

function mousePressed() {
  background(255);

  currentLayer.fill(currentFill);
  currentLayer.ellipse(mouseX, mouseY, ELLIPSE_SIZE, ELLIPSE_SIZE);

  drawRiso();
}

$(document).ready(function(){
  $("#color_buttons button").on("click", function() {
    currentLayer = layers[$(this).val()];
  });

  $("button[name='clear']").on("click", function() {
    clearRiso();
    background(255);
  });

  $("input").on("change input", function() {
    currentFill = parseInt($(this).val());
    updateButtonColors();
  });
})

function updateButtonColors() {
  $("#color_buttons button").each(function() {
    let rgb = layers[$(this).val()].channelColor;

    $(this).css("background", "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + map(currentFill, 0, 255, 0, 1) + ")");
    $(this).css("color", "rgb(" + currentFill + "," + currentFill + "," + currentFill + ")");
  });
}

function keyPressed() {
  // Press "s" to save riso layers
  if (keyCode === 83) {
    exportRiso();
  }

  // Press "i" to save whole image
  if (keyCode === 73) {
    saveCanvas("riso_color_sandbox", "png");
  }
}
