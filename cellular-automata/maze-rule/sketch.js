/* 
Maze Rule
Written by Sergey Torshin @torshin5ergey
*/

const CANVAS_W = 600; // Canvas width (px)
const CANVAS_H = 600; // Canvas height (px)

const WIDTH = 100; // CA field width
const HEIGHT = 100; // CA field height
// Single cell size (px)
const CELL_W = CANVAS_W / WIDTH; // Cell width
const CELL_H = CANVAS_H / HEIGHT; // Cell height

const N = 5; // Start random field

let cells = []; // Cells values array

const FG = "#E8E9F3"; // Foreground color
const BG = "#2F2F2F"; // Background color

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
  colorMode(RGB, 255, 255, 255, 1);
  frameRate(60);
  noStroke();
  cells = generateRandomCells(N, N);
  cells = createStartPattern(cells);
}

function draw() {
  drawCellsField(cells);
  if (frameCount > 3){
    cells = updateCellsField(cells);
  }
}

/**
 * Generate cell state
 * @param {number} array - Empty array
 * @returns {Array<Array<number>>} array - 2D cells values array
 */
function generateRandomCells(N, M) {
  let array = [];
  for (let i = 0; i < N; i++) {
    array[i] = [];
    for (let j = 0; j < M; j++) {
      array[i][j] = Math.round(Math.random());
    }
  }
  return array;
}

/**
 * Draw cell by position and state.
 * @param {number} x - The cell x-coordinate.
 * @param {number} y - The cell y-coordinate.
 * @param {number} w - The cell width.
 * @param {number} h - The cell height.
 * @param {number} state - The cell state (0-1).
 * @returns {void}
 */
function drawCell(x, y, h, w, state) {
  if (state == 1) {
    fill(FG);
  } else {
    fill(BG);
  }
  rect(x * w, y * h, w, h);
}

/**
 * Draws a filed of cells. Uses drawRandomCell() for every cell on the field.
 * @param {Array<Array<number>>} array - 2D array of cells values.
 * @returns {void}
 */
function drawCellsField(array) {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      drawCell(x, y, CELL_W, CELL_H, array[x][y]);
    }
  }
}

/**
 * Updates the cells field based on the provided array of cells.
 * @param {Array<Array<number>>} array - Current state of cells.
 * @returns {Array<Array<number>>} Updated cells array.
 */
function updateCellsField(array) {
  let newCells = JSON.parse(JSON.stringify(cells));
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      let neighbors = getNeighboringCoordinates(x, y);
      let numNeighbors = countLivingNeighbors(array, x, y, neighbors);
      newCells[x][y] = getCellNewValue(array, x, y, numNeighbors);
    }
  }
  return newCells;
}

/**
 * Retrieves the neighboring coordinates for a given cell.
 * @param {number} x - The x-coordinate of the cell.
 * @param {number} y - The y-coordinate of the cell.
 * @returns {Object} An object containing the neighboring coordinates.
 * - top: The x-coordinate of the top neighbor.
 * - right: The y-coordinate of the right neighbor.
 * - bottom: The x-coordinate of the bottom neighbor.
 * - left: The y-coordinate of the left neighbor.
 */
function getNeighboringCoordinates(x, y) {
  return {
    top: (x - 1 + WIDTH) % WIDTH,
    right: (y + 1) % HEIGHT,
    bottom: (x + 1) % WIDTH,
    left: (y - 1 + HEIGHT) % HEIGHT,
  };
}

/**
 * Counts the number of living neighbors for a given cell.
 * @param {Array<Array<number>>} array - The array representing the current state of cells.
 * @param {number} x - The x-coordinate of the cell.
 * @param {number} y - The y-coordinate of the cell.
 * @param {Object} neighbors - An object containing neighboring coordinates.
 * @returns {number} The count of living neighbors for the specified cell.
 */
function countLivingNeighbors(array, x, y, neighbors) {
  let count = 0;
  if (array[neighbors.top][neighbors.left] == 1) count++; // Top left
  if (array[neighbors.top][y] == 1) count++; // Top
  if (array[neighbors.top][neighbors.right] == 1) count++; // Top right
  if (array[x][neighbors.left] == 1) count++; // Left
  if (array[x][neighbors.right] == 1) count++; // Right
  if (array[neighbors.bottom][neighbors.left] == 1) count++; // Bottom left
  if (array[neighbors.bottom][y] == 1) count++; // Bottom
  if (array[neighbors.bottom][neighbors.right] == 1) count++; // Bottom right
  return count;
}

/**
 * Determines the new value for a cell based on the number of living neighbors.
 * @param {Array<Array<number>>} array - The array representing the current state of cells.
 * @param {number} x - The cell x-coordinate.
 * @param {number} y - The cell y-coordinate.
 * @param {number} count - The count of living neighbors for the specified cell.
 * @returns {number} The new value for the cell (0 or 1).
 */
function getCellNewValue(array, x, y, count) {
  if (count === 3 || (array[x][y] === 1 && count >= 1 && count <= 5)) {
    return 1;
  } else {
    return 0;
  }
}

function createStartPattern(pattern) {
  let initialCells = [];

  // Initialize the cells array
  for (let i = 0; i < WIDTH; i++) {
    initialCells[i] = [];
    for (let j = 0; j < HEIGHT; j++) {
      initialCells[i][j] = 0;
    }
  }
  // Determine the starting position for the pattern
  let startX = Math.floor((WIDTH - pattern[0].length) / 2);
  let startY = Math.floor((HEIGHT - pattern.length) / 2);
  // Apply the pattern to the cells array
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      let x = startX + j;
      let y = startY + i;
      initialCells[x][y] = pattern[i][j];
    }
  }
  return initialCells;
}

function mouseClicked() {
  if (mouseButton === LEFT) {
    cells = generateRandomCells(N, N);
    cells = createStartPattern(cells);
  }
}
