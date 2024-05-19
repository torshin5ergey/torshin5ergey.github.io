/* CA Rule184. Multicolor
Written by Sergey Torshin @torshin5ergey
*/

const CANVAS_W = 640; // Canvas width (px)
const CANVAS_H = 640; // Canvas height (px)

const WIDTH = 80; // CA field width
const HEIGHT = 80; // CA field height

// Single cell size (px)
const CELL_W = CANVAS_W / WIDTH; // Cell width
const CELL_H = CANVAS_H / HEIGHT; // Cell height

let cells = []; // Cells values array
let currentRowToClear = 0;
let isForward = true;

let fgColors; // Foreground colors
let BG; // Background color
let interValue; // Lerp color ratio

function setup() {
  colorMode(RGB, 255, 255, 255, 1);
  fgColor = [color("rgb(124, 234, 156)"), color("rgb(247, 172, 207)"), color("rgb(85, 214, 190)"), color("rgb(104, 116, 232)")]
  fgColor1 = random(fgColor);
  fgColor2 = random(fgColor);
  BG = color("rgb(47, 47, 47)"); // Background color
  const canvas = createCanvas(CANVAS_W, CANVAS_H);
  canvas.parent("canvas");
  background(BG);
  frameRate(60);
  noStroke();
  cells = generateZerosField();
  cells = generateRandomLine(cells, floor(random(100)));
  drawCellsField(cells);
}

function draw() {
  if (isForward === true) {
    cells = updateCells(cells);
  } else {
    cells = resetCells(cells, currentRowToClear);
  }
  interValue = map(currentRowToClear, 0, HEIGHT, 0, 1);
  drawCellsField(cells);
  currentRowToClear++;
  if (currentRowToClear === HEIGHT) {
    isForward = !isForward;
    currentRowToClear = 0;
    cells = generateRandomLine(cells, 55);
    fgColor1 = random(fgColor);
    fgColor2 = random(fgColor);
  }
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
 * Generates a random line on the top of the given array with the specified density.
 * @param {Array<Array<number>>} array - The 2D array representing the cell field.
 * @param {number} density - The density of the random line (0-100).
 * @returns {Array<Array<number>>} The modified array with the random top line.
 */
function generateRandomLine(array, density) {
  for (let i = 0; i < WIDTH; i++) {
    if (Math.random() * 100 < density) {
      array[i][0] = 1;
    } else {
      array[i][0] = 0;
    }
  }
  return array;
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
    fill(lerpColor(fgColor1, fgColor2, interValue));
    //fill(fgLavender);
    rect(x * CELL_W, y * CELL_H, CELL_W, CELL_H);
  } else {
    fill(BG);
    rect(x * CELL_W, y * CELL_H, CELL_W, CELL_H);
  }
}

/**
 * Erases the cell at the specified coordinates by filling it with the background color.
 * @param {number} x - The x-coordinate of the cell.
 * @param {number} y - The y-coordinate of the cell.
 * @returns {void}
 */
function eraseCell(x, y) {
  fill(BG);
  rect(x * CELL_W, y * CELL_H, CELL_W, CELL_H);
}

/**
 * Draws a filed of cells. Uses drawRandomCell() for every cell on the field.
 * @param {Array<Array<number>>} array - 2D array of cells values.
 * @returns {void}
 */
function drawCellsField(array) {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = currentRowToClear; y < HEIGHT; y++) {
      if (isForward === true) {
        drawCell(x, y, array[x][y]);
      } else {
        eraseCell(x, currentRowToClear);
      }
    }
  }
}

/**
 * Updates the cells in the given array based on the Rule 184 cellular automaton.
 * @param {Array<Array<number>>} array - The 2D array representing the cell field.
 * @returns {Array<Array<number>>} The modified array with updated cell states according to Rule 184.
 */
function updateCells(array) {
  let newCells = JSON.parse(JSON.stringify(array));
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      let cur = array[x][y];
      let left = array[(x - 1 + WIDTH) % WIDTH][y];
      let right = array[(x + 1 + WIDTH) % WIDTH][y];
      let curPat = [left, cur, right]; // Current pattern
      // Define new cell state
      if (
        curPat.toString() === [1, 1, 1].toString() ||
        curPat.toString() === [1, 0, 1].toString() ||
        curPat.toString() === [1, 0, 0].toString() ||
        curPat.toString() === [0, 1, 1].toString()
      ) {
        newCells[x][y + 1] = 1;
      } else if (
        curPat.toString() === [1, 1, 0].toString() ||
        curPat.toString() === [0, 1, 0].toString() ||
        curPat.toString() === [0, 0, 1].toString() ||
        curPat.toString() === [0, 0, 0].toString()
      ) {
        newCells[x][y + 1] = 0;
      }
    }
  }
  return newCells;
}

/**
 * Resets the cells in the specified row to 0 in the given array.
 * @param {Array<Array<number>>} array - The 2D array representing the cell field.
 * @param {number} row - The index of the row to reset.
 * @returns {Array<Array<number>>} The modified array with cells in the specified row reset to 0.
 */
function resetCells(array, row) {
  let newCells = JSON.parse(JSON.stringify(array)); // Copy the array
  for (let x = 0; x < WIDTH; x++) {
    newCells[x][row] = 0; // Cell state to 0
  }
  return newCells;
}
