var canvas;
let num = 500;
let particles = [];
let noiseScale = 500, noiseStrength = 1;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight).parent("canvas");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent("canvas");
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  noStroke();
  //background(0);
  for (let i = 0; i < num; i++) {
    let loc = createVector(random(width * 1.2), random(height), 2);
    let angle = random(TWO_PI);
    let dir = createVector(cos(angle), sin(angle));
    let speed = random(.1, .5);
    particles[i] = new Particle(loc, dir, speed);
  }
}

function draw() {
  //background(0);
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);
  fill(15, 15, 15);
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
}

class Particle {
  constructor(_loc, _dir, _speed) {
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    this.vel = createVector();
    this.d = 1; // direction change
  }

  run() {
    this.move();
    this.checkEdges();
    this.update();
  }

  move() {
    let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed * this.d);
    this.loc.add(this.vel);
  }

  checkEdges() {
    //let distance = dist(width/2, height/2, this.loc.x, this.loc.y);
    //if (distance > 150) {
    if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
      this.loc.x = random(width * 1.2);
      this.loc.y = random(height);
    }
  }

  update() {
    fill(30);
    ellipse(this.loc.x, this.loc.y, this.loc.z*2, this.loc.z*2);
  }
}
