let paths;

class Pathfinder {
  constructor(parent) {
    if (parent) {
      this.location = parent.location.copy();
      this.velocity = parent.velocity.copy();
      let area = PI * sq(parent.diameter / 2);
      let newDiam = sqrt(area / (2 * PI)) * 2;
      this.diameter = newDiam;
      parent.diameter = newDiam;
    } else {
      this.location = createVector(width / 2, height);
      this.velocity = createVector(0, -1);
      this.diameter = 32;
    }
  }

  update() {
    if (this.diameter > 0.5) {
      this.location.add(this.velocity);
      let bump = createVector(random(-1, 1), random(-1, 1));
      bump.mult(0.1);
      this.velocity.add(bump);
      this.velocity.normalize();
      if (random(0, 1) < 0.02) {
        paths.push(new Pathfinder(this));
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  ellipseMode(CENTER);
  fill(132, 235, 143, 50);
  noStroke();
  smooth();
  paths = [new Pathfinder()];
}

function draw() {
  for (let i = 0; i < paths.length; i++) {
    let loc = paths[i].location;
    let diam = paths[i].diameter;
    ellipse(loc.x, loc.y, diam, diam);
    paths[i].update();
  }
}

function mousePressed() {
  background(0);
  paths = [new Pathfinder()];
}
