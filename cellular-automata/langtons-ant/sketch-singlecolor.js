/* Langton's ant (singlecolor)
Written by Sergey Torshin @torshin5ergey
*/

function setup() {
  RULES = {
    up: {
      0: { direction: "right", xChange: 1, yChange: 0 },
      1: { direction: "left", xChange: -1, yChange: 0 },
    },
    down: {
      0: { direction: "left", xChange: -1, yChange: 0 },
      1: { direction: "right", xChange: 1, yChange: 0 },
    },
    left: {
      0: { direction: "up", xChange: 0, yChange: -1 },
      1: { direction: "down", xChange: 0, yChange: 1 },
    },
    right: {
      0: { direction: "down", xChange: 0, yChange: 1 },
      1: { direction: "up", xChange: 0, yChange: -1 },
    },
  };
  
  CANVAS_W = 600; // Canvas width (px)
  CANVAS_H = 600; // Canvas height (px)
  
  WIDTH = 50; // CA field width
  HEIGHT = 50; // CA field height
  // Single cell size (px)
  CELL_W = CANVAS_W / WIDTH; // Cell width
  CELL_H = CANVAS_H / HEIGHT; // Cell height
  
  cells = []; // Sells values array
  ANTS_COUNT = 1;
  ants = []; // List of dictionaries. Ants positions (x:pos, y:pos)
  
  FG = "#E8E9F3"; // Foreground color
  BG = "#2F2F2F"; // Background color

  //createCanvas(CANVAS_W, CANVAS_H);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  frameRate(60);
  cells = generateZerosField();
  ants = generateRandomAnts(ants);
  noStroke();
}

function draw() {
  drawCellsField(cells);
  drawAnts(ants);
  const updated = moveAnts(ants, cells);
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
 * Generates a specified number of random ants with random positions, directions, and colors.
 * @param {Array<Object>} ants - Array to store generated ant objects.
 * @returns {Array<Object>} Array of ant objects.
 */
function generateRandomAnts(ants) {
  for (let i = 0; i < ANTS_COUNT; i++) {
    ant = {
      x: floor(random(WIDTH)),
      y: floor(random(HEIGHT)),
      direction: "up",
      colour: color(floor(random(255)), floor(random(255)), floor(random(255))),
    };
    ants.push(ant);
  }
  return ants;
}

/**
 * Draw cell by position and state.
 * @param {number} x - The cell x-coordinate.
 * @param {number} y - The cell y-coordinate.
 * @param {number} state - The cell state (0-1).
 * @returns {void}
 */
function drawCell(x, y, state) {
  if (state == 1) {
    fill(FG);
  } else {
    fill(BG);
  }
  rect(x * CELL_W, y * CELL_H, CELL_W, CELL_H);
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
 * Draws ants on a canvas based on their positions and colors.
 * @param {Array<Object>} ants - Array of ant objects with properties: x, y, colour.
 * @returns {void}
 */
function drawAnts(ants) {
  for (let i = 0; i < ANTS_COUNT; i++) {
    const ant = ants[i];
    fill(ant.colour);
    rect(ant.x * CELL_W, ant.y * CELL_H, CELL_W, CELL_H);
  }
}

/**
 * Moves a colony of ants on a field according to the algorithm rules.
 * Each ant follows a set of rules based on the current cell's value and ant's direction.
 * @param {Array<Object>} ants - Array of ant objects with properties: x, y, direction.
 * @param {Array<Array<number>>} array - 2D array representing the field of cells.
 * @returns {Object} Object containing updated ant positions and cell values.
 */
function moveAnts(ants, array) {
  for (let i = 0; i < ANTS_COUNT; i++) {
    const ant = ants[i];
    const antX = ant.x;
    const antY = ant.y;
    const antDir = ant.direction;
    // Rules for the current ant position
    const directionRules = RULES[antDir];
    // Current cell value
    const cellValue = array[antX][antY];
    // Rules for current ant direction in current cell
    const currentRules = directionRules[cellValue];
    // Update ant direction
    ant.direction = currentRules.direction;
    // Update ant position
    ant.x = (ant.x + currentRules.xChange + WIDTH) % WIDTH;
    ant.y = (ant.y + currentRules.yChange + HEIGHT) % HEIGHT;
    // Update cell state
    array[antX][antY] = (cellValue + 1) % 2;
  }
  return {
    ants: ants,
    cells: array,
  };
}

function mouseClicked() {
  if (mouseButton === LEFT) {
    cells = generateZerosField();
    ants = generateRandomAnts([]);
  }
}
