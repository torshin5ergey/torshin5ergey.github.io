// Conway's Game of Life
// Written by Sergey Torshin @torshin5ergey

function setup() {
  CANVAS_W = 600; // Canvas width (px)
  CANVAS_H = 600; // Canvas height (px)
  WIDTH = 100; // CA field width
  HEIGHT = 100; // CA field height
  // Single cell size (px)
  CELL_W = CANVAS_W / WIDTH; // Cell width
  CELL_H = CANVAS_H / HEIGHT; // Cell height
  cells = [];

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");

  FG = "#E8E9F3"; // Foreground color
  BG = "#2F2F2F"; // Background color
  background(BG);
  frameRate(30);
  noStroke();
  cells = generateRandomCells();
}

function draw() {
  drawCellsField(cells);
  cells = updateCellsField(cells);
}

/**
 * Generate cell state
 * @param {number} array - Empty array
 * @returns {Array<Array<number>>} array - 2D cells values array
 */
function generateRandomCells() {
  let array = [];
  for (let i = 0; i < WIDTH; i++) {
    array[i] = [];
    for (let j = 0; j < HEIGHT; j++) {
      if (int(random(2)) == 1) {
        array[i][j] = 1;
      } else {
        array[i][j] = 0;
      }
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
  if (count === 3 || (array[x][y] === 1 && count === 2)) {
    return 1;
  } else {
    return 0;
  }
}

function mouseClicked() {
  if (mouseButton === LEFT) {
    cells = generateRandomCells();
  }
}

/*
// Test for generating cells with random gray value
function randomCellTest() {
  background(220);
  for (let i = 0; i < CANVAS_W; i += CELL_W) {
    for (let j = 0; j < CANVAS_H; j += CELL_H) {
      noStroke();
      fill(random(255));
      rect(i, j, CANVAS_W, CELL_H);
    }
  }
}
*/
