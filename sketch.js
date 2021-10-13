let sketch = function (p) {
  let particles = [[], [], []];
  let nums = 500;
  let noiseScale = 2000;
  let timer = 0;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    sketchReset();
  };

  p.draw = function () {
    p.noStroke();
    p.smooth();
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < nums; j++) {
        let radius = p.map(j, 0, nums, 1, 2);
        if (i == 0) p.fill(255, 153, 153);
        if (i == 1) p.fill(204, 153, 255);
        if (i == 2) p.fill(153, 153, 255);
        particles[i][j].move();
        particles[i][j].display(radius, p);
        particles[i][j].checkEdge();
      }
    }
    timer > 30 * 60 ? sketchReset() : timer++;
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    sketchReset();
  };

  const sketchReset = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < nums; j++) {
        particles[i][j] = new Particle(p.random(0, p.width), p.random(0, p.height));
      }
    }
    p.noiseSeed(p.random(1000));
    p.background(255, 255, 255);
    timer = 0;
  };

  class Particle {
    constructor(x, y) {
      this.dir = p.createVector(0, 0);
      this.vel = p.createVector(0, 0);
      this.pos = p.createVector(x, y);
      this.speed = p.random([-1, 1]) * 0.8;
    }

    move() {
      let angle = p.noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * p.TWO_PI * 10;
      this.dir.x = p.cos(angle);
      this.dir.y = p.sin(angle);
      this.vel = this.dir.copy();
      this.vel.mult(this.speed);
      this.pos.add(this.vel);
    }

    checkEdge() {
      if (this.pos.x > p.width || this.pos.x < 0 || this.pos.y > p.height || this.pos.y < 0) {
        this.pos.x = p.random(50, p.width);
        this.pos.y = p.random(50, p.height);
        this.speed = -1 * this.speed;
      }
    }

    display(r) {
      p.ellipse(this.pos.x, this.pos.y, r, r);
    }
  }
};
new p5(sketch, "container");
