let particles = [[], [], []];
let nums = 500;
let noiseScale = 2000;
let timer = 0;
let button;

//

function setup() {
  createCanvas(windowWidth, windowHeight);
  sketchReset();
  button = createButton("click me");
  const parent = document.querySelector("#artwork");
  button.parent(parent);
}

function draw() {
  noStroke();
  smooth();
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < nums; j++) {
      let radius = map(j, 0, nums, 1, 2);
      if (i == 0) fill(255, 153, 153);
      if (i == 1) fill(204, 153, 255);
      if (i == 2) fill(153, 153, 255);
      particles[i][j].move();
      particles[i][j].display(radius);
      particles[i][j].checkEdge();
    }
  }
  timer > 30 * 60 ? sketchReset() : timer++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sketchReset();
}

function sketchReset() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < nums; j++) {
      particles[i][j] = new Particle(random(0, width), random(0, height));
    }
  }
  noiseSeed(random(1000));
  background(255, 255, 255);
  timer = 0;
}

class Particle {
  constructor(x, y) {
    this.dir = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.pos = createVector(x, y);
    this.speed = random([-1, 1]) * 0.8;
  }

  move() {
    let angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * TWO_PI * 10;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }

  checkEdge() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.pos.x = random(50, width);
      this.pos.y = random(50, height);
      this.speed = -1 * this.speed;
    }
  }

  display(r) {
    ellipse(this.pos.x, this.pos.y, r, r);
  }
}
