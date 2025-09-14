/*
Wolfram's Rules (30, 120, 135, 225). Triangle generator
Written by Sergey Torshin @torshin5ergey
*/

function setup() {
  CANVAS_W = 600; // Canvas width (px) 603
  CANVAS_H = 600; // Canvas height (px) 1072
  WIDTH = 100; // CA field width (153 27)
  HEIGHT = 100; // CA field height (272 48)
  // Single cell size (px)
  CELL_W = CANVAS_W / WIDTH; // Cell width
  CELL_H = CANVAS_H / HEIGHT; // Cell height
  cells = []; // Cells values array.
  rule = "rule30"; // rule30, rule120, rule135, rule225

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  colorMode(RGB, 255, 255, 255, 1);
  BG = color("rgb(47, 47, 47)"); // Background color
  FG = color("rgb(232, 233, 243"); // Foreground color
  background(BG);
  frameRate(60);
  noStroke();
  cells = generateZerosField();
  cells = genarateOriginCell(cells);
}

function draw() {
  if (frameCount % HEIGHT === 0) {
    cells = generateZerosField();
    cells = genarateOriginCell(cells);
  }
  drawCellsField(cells);
  cells = updateCells(cells, rule);
}

/**
 * Generates a 2D array representing a field filled with zeros.
 * @returns {Array<Array<number>>} 2D array filled with zeros.
 */
function generateZerosField() {
  const array = new Array(WIDTH).fill(0).map(() => new Array(HEIGHT).fill(0));
  return array;
}

/**
 * Generates a random line on the bot of the given array with the specified density.
 * @param {Array<Array<number>>} array - The 2D array representing the cell field.
 * @param {number} density - The density of the random line (0-100).
 * @returns {Array<Array<number>>} The modified array with the random bot line.
 */
function generateRandomLine(array, density) {
  fLine = [];
  for (let i = 0; i < WIDTH; i++) {
    if (Math.random() * 100 < density) {
      array[i][0] = 1;
      fLine.push(1);
    } else {
      array[i][0] = 0;
      fLine.push(0);
    }
  }
  return array, fLine;
}

/**
 * Generate cell in the upper right corner
 * @returns {Array<Array<number>>} The modified 2D array with a cell
 */
function genarateOriginCell(array) {
  for (let i = 0; i < floor(random(1, 5)); i++) {
    array[floor(random(0, WIDTH))][0] = 1;
  }
  return array;
}

/**
 * Draws a filed of cells. Uses drawCell() for every cell on the field.
 * @param {Array<Array<number>>} array - 2D array of cells values.
 * @returns {void}
 */
function drawCellsField(array) {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      drawCell(x, y, array[x][y]);
    }
  }
}

/**
 * Draw cell by position and state.
 * @param {number} x - The cell x-coordinate.
 * @param {number} y - The cell y-coordinate.
 * @param {number} state - The cell state (0-1).
 * @returns {void}
 */
function drawCell(x, y, state) {
  if (state === 1) {
    fill(FG);
    //fill(fgLavender);
    rect(x * CELL_W, y * CELL_H, CELL_W, CELL_H);
  } else {
    fill(BG);
    rect(x * CELL_W, y * CELL_H, CELL_W, CELL_H);
  }
}

/**
 * Updates the cells in the given array based on the Rule 184 cellular automaton.
 * @param {Array<Array<number>>} array - The 2D array representing the cell field.
 * @returns {Array<Array<number>>} The modified array with updated cell states according to Rule 184.
 */
function updateCells(array, rule) {
  const newCells = JSON.parse(JSON.stringify(array));
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT ; y++) {
      const cur = array[x][y];
      const top = array[x][(y - 1 + HEIGHT) % HEIGHT];
      const bottom = array[x][(y + 1 + HEIGHT) % HEIGHT];
      const left = array[(x - 1 + WIDTH) % WIDTH][y];
      const right = array[(x + 1 + WIDTH) % WIDTH][y];
      const curPat = [left, cur, right]; // Current pattern
      // Define new cell state
      const newState = applyRule(rule, curPat);
      newCells[x][y+1] = newState;
    }
  }
  return newCells;
}


function applyRule(rule, pattern) {
  // Apply Rule 30
  if (rule === "rule30") {
    if (
      pattern.toString() === [0, 0, 1].toString() ||
      pattern.toString() === [0, 1, 0].toString() ||
      pattern.toString() === [1, 0, 0].toString() ||
      pattern.toString() === [0, 1, 1].toString()
    ) {
      return 1;
    } else if (
      pattern.toString() === [1, 1, 1].toString() ||
      pattern.toString() === [1, 1, 0].toString() ||
      pattern.toString() === [1, 0, 1].toString() ||
      pattern.toString() === [0, 0, 0].toString()
    ) {
      return 0;
    }
  } else if (rule === "rule120") {
    if (
      pattern.toString() === [1, 1, 0].toString() ||
      pattern.toString() === [1, 0, 1].toString() ||
      pattern.toString() === [1, 0, 0].toString() ||
      pattern.toString() === [0, 1, 1].toString()
  ) {
      return 1;
  } else if (
      pattern.toString() === [1, 1, 1].toString() ||
      pattern.toString() === [0, 1, 0].toString() ||
      pattern.toString() === [0, 0, 1].toString() ||
      pattern.toString() === [0, 0, 0].toString()
  ) {
      return 0;
  }
  }  else if (rule === "rule135") {
    if (
      pattern.toString() === [1, 1, 1].toString() ||
      pattern.toString() === [0, 1, 0].toString() ||
      pattern.toString() === [0, 0, 1].toString() ||
      pattern.toString() === [0, 0, 0].toString()
  ) {
      return 1;
  } else if (
      pattern.toString() === [1, 1, 0].toString() ||
      pattern.toString() === [1, 0, 1].toString() ||
      pattern.toString() === [1, 0, 0].toString() ||
      pattern.toString() === [0, 1, 1].toString()
  ) {
      return 0;
  }
  } else if (rule === "rule225") {
    if (
      pattern.toString() === [1, 1, 1].toString() ||
      pattern.toString() === [1, 1, 0].toString() ||
      pattern.toString() === [1, 0, 1].toString() ||
      pattern.toString() === [0, 0, 0].toString()
  ) {
      return 1;
  } else if (
      pattern.toString() === [1, 0, 0].toString() ||
      pattern.toString() === [0, 1, 1].toString() ||
      pattern.toString() === [0, 1, 0].toString() ||
      pattern.toString() === [0, 0, 1].toString()
  ) {
      return 0;
  }
  }
  else {
    return 0;
  }
}
