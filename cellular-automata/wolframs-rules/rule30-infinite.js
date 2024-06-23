/*
Wolfram's Rules (30, 120, 135, 225). Infinite full canvas loop
Written by Sergey Torshin @torshin5ergey
*/
/*
const CANVAS_W = 600; // Canvas width (px) 603
const CANVAS_H = 600; // Canvas height (px) 1072
const WIDTH = 100; // CA field width 153 27
const HEIGHT = 100; // CA field height 272 48
// Single cell size (px)
const CELL_W = CANVAS_W / WIDTH; // Cell width
const CELL_H = CANVAS_H / HEIGHT; // Cell height

let cells = []; // Cells values array.
let FG; // Foreground colors
let BG; // Background color
let firstLineDensity; // Cells density
let rule = "rule30"; // rule30, rule120, rule135, rule225
let originalLine;
*/

function setup() {
    CANVAS_W = 600; // Canvas width (px) 603
    CANVAS_H = 600; // Canvas height (px) 1072
    WIDTH = 100; // CA field width 153 27
    HEIGHT = 100; // CA field height 272 48
    // Single cell size (px)
    CELL_W = CANVAS_W / WIDTH; // Cell width
    CELL_H = CANVAS_H / HEIGHT; // Cell height
    cells = []; // Cells values array.
    rule = "rule30"; // rule30, rule120, rule135, rule225
    ////////////////////////////////////////////////////////////////////////////
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("sketch-container");
    colorMode(RGB, 255, 255, 255, 1);
    BG = color("rgb(47, 47, 47)"); // Background color
    FG = color("rgb(232, 233, 243)"); // Foreground color
    background(BG);
    frameRate(60);
    noStroke();
    cells = generateZerosField();
    firstLineDensity = floor(random(0, 101));
    cells, originalLine = generateRandomLine(cells, firstLineDensity);
    //drawCellsField(cells);
}

function draw() {
  // Infinite loop
  drawCellsField(cells);
  cells = updateCells(cells, rule);
  if (frameCount % HEIGHT === 0 && frameCount != 0) {
    cells, _ = generateRandomLine(cells, random(0, 101));
  }
  
  /*
  // Perfect loop
  if (frameCount === HEIGHT*4) {
      for (let i = 0; i < WIDTH; i++) {
        cells[i][0] = originalLine[i];
      }
    }
    if (frameCount === HEIGHT*5) {
      noLoop();
    }
    cells = updateCells(cells);
    if (frameCount%HEIGHT === 0 && (frameCount !== 0 && frameCount < HEIGHT*4)) {
      cells, line = generateRandomLine(cells, firstLineDensity);
      //console.log('new line')
    }
    drawCellsField(cells);
    */
  }

/**
 * Generates a 2D array representing a field filled with zeros.
 * @returns {Array<Array<number>>} 2D array filled with zeros.
 */
function generateZerosField() {
    let array = new Array(WIDTH).fill(0).map(() => new Array(HEIGHT).fill(0));
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
    let newCells = JSON.parse(JSON.stringify(array));
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT ; y++) {
        let cur = array[x][y];
        let left = array[(x - 1 + WIDTH) % WIDTH][y];
        let right = array[(x + 1 + WIDTH) % WIDTH][y];
        let curPat = [left, cur, right]; // Current pattern
        // Define new cell state
        let newState = applyRule(rule, curPat);
        newCells[x][y + 1] = newState;
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