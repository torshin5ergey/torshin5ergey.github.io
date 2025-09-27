/* 
dangerous web
Written by Sergey Torshin @torshin5ergey
*/

const BG = "#2F2F2F";
const FG = "#E8E9F3";

const minRadius = 2;
const maxRadius = 400;
const step = 80;

const circleRadius = 100; // circle movement radius
let angle = 0;

function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent("canvas");

  frameRate(60);
  noCursor();
  currentRadius = minRadius;
  angleMode(DEGREES);
}

function draw() {
  background(BG);
  const parallaxX = map(width/2, 0, width, -25, 25);
  const parallaxY = map(height/2, 0, height, -25, 25);
  translate(parallaxX, parallaxY);
  drawCircles();

  angle += 1;
  if (angle >= 360) angle = 0;
}

function drawCircles() {
  const centerX = width / 2;
  const centerY = height / 2;
  const movingX = centerX + circleRadius * cos(angle);
  const movingY = centerY + circleRadius * sin(angle);
  
  for (let i = -step; i < width+step; i+=step) {
    for (let j = -step; j < height+step; j += step) {
      noFill();
      strokeWeight(1);
      const distance = dist(i, j, movingX, movingY);
      const maxDist = dist(0, 0, width, height);
      const mappedRadius = map(0, distance, maxDist, maxRadius, minRadius);
      const mappedAlpha = map(0, distance, maxDist, 210, 255);
      stroke(red(FG), green(FG), blue(FG), mappedAlpha);
      circle(i, j, mappedRadius);
    }
  }
}
