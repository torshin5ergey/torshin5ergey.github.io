/* Langton's ant (multicolored)
Written by Sergey Torshin @torshin5ergey
*/

function setup() {
  // Rules for ant based on direction and cell value.
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

  WIDTH = 70; // CA field width
  HEIGHT = 70; // CA field height
  // Single cell size (px)
  CELL_W = CANVAS_W / WIDTH; // Cell width
  CELL_H = CANVAS_H / HEIGHT; // Cell height

  cells = []; // Cells values array
  ANTS_COUNT = 5; // Langton's ants count
  ants = []; // List of dictionaries. Ants positions (x:pos, y:pos)

  BG = "#2F2F2F"; // Background color
  //createCanvas(CANVAS_W, CANVAS_H);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  frameRate(60);
  noStroke();
  cells = generateZerosField();
  ants = generateRandomAnts(ants);
  // RULES for every ant
  for (let i = 1; i < ANTS_COUNT + 1; i++) {
    RULES.up[i] = { direction: "left", xChange: -1, yChange: 0 };
    RULES.down[i] = { direction: "right", xChange: 1, yChange: 0 };
    RULES.left[i] = { direction: "down", xChange: 0, yChange: 1 };
    RULES.right[i] = { direction: "up", xChange: 0, yChange: -1 };
  }
}

function draw() {
  drawCellsField(cells);
  drawAnts(ants);
  let updated = moveAnts(ants, cells);
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
 * Generates a specified number of random ants with random positions, directions, and colors.
 * @param {Array<Object>} ants - Array to store generated ant objects.
 * @returns {Array<Object>} Array of ant objects.
 */
function generateRandomAnts(ants) {
  for (let i = 0; i < ANTS_COUNT; i++) {
    ant = {
      x: floor(random(WIDTH)),
      y: floor(random(HEIGHT)),
      direction: random(["up", "down", "left", "right"]),
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
  if (state === 0) {
    fill(BG);
  } else {
    fill(ants[state - 1].colour);
  }
  rect(x * CELL_W, y * CELL_H, CELL_W, CELL_H);
}

/**
 * Draws a filed of cells. Uses drawRandomCell() for every cell on the field.
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

function drawAnts(ants) {
  for (let i = 0; i < ANTS_COUNT; i++) {
    let ant = ants[i];
    fill(ant.colour);
    rect(ant.x * CELL_W, ant.y * CELL_H, CELL_W, CELL_H);
  }
}

function moveAnts(ants, array) {
  for (let i = 0; i < ANTS_COUNT; i++) {
    let ant = ants[i];
    let antX = ant.x;
    let antY = ant.y;
    let antDir = ant.direction;
    // Rules for the current ant position
    let directionRules = RULES[antDir];
    // Current cell value
    let cellValue = array[antX][antY];
    // Rules for current ant direction in current cell
    let currentRules = directionRules[cellValue];
    // Update ant direction
    ant.direction = currentRules.direction;
    // Update ant position
    ant.x = (ant.x + currentRules.xChange + WIDTH) % WIDTH;
    ant.y = (ant.y + currentRules.yChange + HEIGHT) % HEIGHT;

    // Update cell state depends on ant number
    if (cellValue === 0) {
      array[antX][antY] = i + 1;
    } else {
      array[antX][antY] = 0;
    }
  }
}

function mouseClicked() {
  if (mouseButton === LEFT) {
    cells = generateZerosField();
    ants = generateRandomAnts([]);
  }
}
