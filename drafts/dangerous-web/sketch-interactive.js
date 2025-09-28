/* 
dangerous web interactive
Written by Sergey Torshin @torshin5ergey
*/

const BG = "#2F2F2F";
const FG = "#E8E9F3";

const minRadius = 2;
const maxRadius = 200;
const step = 50;

let canvas_width = document.getElementById('canvas').offsetWidth;
let canvas_height = document.getElementById('canvas').offsetHeight;

function setup() {
  const canvas = createCanvas(canvas_width, canvas_height);
  canvas.parent("canvas");

  frameRate(60);
  noCursor();
  currentRadius = minRadius;
  angleMode(DEGREES);
}

function draw() {
  canvas_width = document.getElementById('canvas').offsetWidth;
  canvas_height = document.getElementById('canvas').offsetHeight;
  resizeCanvas(canvas_width, canvas_height);

  background(BG);
  const parallaxX = map(mouseX, 0, width, -25, 25);
  const parallaxY = map(mouseY, 0, height, -25, 25);
  translate(parallaxX, parallaxY);
  drawCircles();
}

function drawCircles() {
  for (let i = -step; i < width+step; i+=step) {
    for (let j = -step; j < height+step; j += step) {
      noFill();
      strokeWeight(1);
      const distance = dist(i, j, mouseX, mouseY);
      const maxDist = dist(0, 0, width, height);
      const mappedRadius = map(0, distance, maxDist, maxRadius, minRadius);
      const mappedAlpha = map(0, distance, maxDist, 210, 255);
      stroke(red(FG), green(FG), blue(FG), mappedAlpha);
      circle(i, j, mappedRadius);
    }
  }
}
