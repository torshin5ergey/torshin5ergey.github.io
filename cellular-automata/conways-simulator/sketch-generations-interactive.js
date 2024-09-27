/* Conway's Game of Life simulator with generations (interactive vesrion)
Written by Sergey Torshin @torshin5ergey
*/

function setup() {
  CANVAS_W = 600; // Canvas width (px)
  CANVAS_H = 600; // Canvas height (px)
  WIDTH = 80; // CA field width
  HEIGHT = 80; // CA field height
  // Single cell size (px)
  CELL_W = CANVAS_W / WIDTH; // Cell width
  CELL_H = CANVAS_H / HEIGHT; // Cell height

  cells = []; // Cells values array
  generations = 20; // Maximum number of generations

  bornSize = 2; // bornSize*2+1 is the size of the born area

  colorMode(HSB, 360, 100, 100); // HSB color mode with alpha support
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  frameRate(30);
  noStroke();
  cells = new Array(WIDTH).fill(0).map(() => new Array(HEIGHT).fill(0));
}

function draw() {
  drawCellsField(cells);
  cells = updateCellsField(cells);
  if (mouseIsPressed) {
    cells = bornLife(cells);
  }
}

/**
 * Create alive cells around the mouse
 * @param {Array<Array<number>>} - Array of cells
 * @returns {Array<Array<number>>} array - Updated cells
 */
function bornLife(array) {
  let x = constrain(floor(mouseX/CELL_W), bornSize, WIDTH-bornSize-1);
  let y = constrain(floor(mouseY/CELL_H), bornSize, HEIGHT-bornSize-1);
  for (let i = -bornSize; i <= bornSize; i++) {
    for (let j = -bornSize; j <=bornSize; j++) {
      if ((i + j) % 2 === 0) {
        array[x+i][y+j] = generations;
      }
    }
  }
  return cells;
}

/**
 * Draw cell by position and state.
 * @param {number} x - The cell x-coordinate.
 * @param {number} y - The cell y-coordinate.
 * @param {number} w - The cell width.
 * @param {number} h - The cell height.
 * @param {number} state - The cell state (0-generations).
 * @returns {void}
 */
function drawCell(x, y, h, w, state) {
  if (state == 0) {
    fill(0, 0, 18); // Background color with low alpha
  } else {
    let brightnessValue = map(state, 0, generations, 18, 95);
    fill(235, 5, brightnessValue); // Foreground color with dynamic brightness
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
  if (array[neighbors.top][neighbors.left] == generations) count++; // Top left
  if (array[neighbors.top][y] == generations) count++; // Top
  if (array[neighbors.top][neighbors.right] == generations) count++; // Top right
  if (array[x][neighbors.left] == generations) count++; // Left
  if (array[x][neighbors.right] == generations) count++; // Right
  if (array[neighbors.bottom][neighbors.left] == generations) count++; // Bottom left
  if (array[neighbors.bottom][y] == generations) count++; // Bottom
  if (array[neighbors.bottom][neighbors.right] == generations) count++; // Bottom right
  return count;
}

/**
 * Determines the new value for a cell based on the number of living neighbors.
 * @param {Array<Array<number>>} array - The array representing the current state of cells.
 * @param {number} x - The cell x-coordinate.
 * @param {number} y - The cell y-coordinate.
 * @param {number} count - The count of living neighbors for the specified cell.
 * @returns {number} The new value for the cell (0-generations).
 */
function getCellNewValue(array, x, y, count) {
  if (count === 3 || (array[x][y] == generations && count === 2)) {
    return generations; // Cell stays alive or becomes alive
  } else {
    return max(array[x][y] - 1, 0); // Cell ages and can go down to 0
  }
}

function mouseClicked() {
    return
  }