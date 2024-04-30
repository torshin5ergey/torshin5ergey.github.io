/* Langton's ant
Written by Sergey Torshin @torshin5ergey
*/

// Rules for ant based on direction and cell value.
const RULES = {
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

const CANVAS_W = 610; // Canvas width (px)
const CANVAS_H = 610; // Canvas height (px)

const WIDTH = 100; // CA field width
const HEIGHT = 100; // CA field height
// Single cell size (px)
const CELL_W = CANVAS_W / WIDTH; // Cell width
const CELL_H = CANVAS_H / HEIGHT; // Cell height

let cells = []; // Sells values array
const ANTS_COUNT = 1;
let ants = []; // List of dictionaries. Ants positions (x:pos, y:pos)

const FG = "#E8E9F3"; // Foreground color
const BG = "#2F2F2F"; // Background color

function setup() {
  //createCanvas(CANVAS_W, CANVAS_H);
  let canvas = createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  canvas.parent("canvas");
  frameRate(60);
  cells = generateZerosField();
  ants = generateRandomAnts(ants);
  noStroke();
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
    let ant = ants[i];
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
    // Update cell state
    array[antX][antY] = (cellValue + 1) % 2;
  }
  return {
    ants: ants,
    cells: array,
  };
}
