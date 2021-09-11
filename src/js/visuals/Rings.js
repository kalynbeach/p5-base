/**
 * Ring Visuals
**/

// Inspired by Ira Greenberg - https://p5js.org/examples/form-triangle-strip.html


class Rings {

  constructor(p, configs = {}) {
    this.p = p;
    this.configs = configs;
    this.x = null;
    this.y = null;
    this.outsideRadius = 150;
    this.insideRadius = 100;
    this.color = 0;
    this.scaleA;
    this.scaleS;
  }


  setup(p, bands) {
    p.background(0);
    bands.numPoints = 1;
    this.x = p.width / 2; 
    this.y = p.height / 2;
  }


  draw(p, bands) {
    for (let i = 0; i < bands.detectors.length; i++) {
      bands.detectors[i].update(p.fft);
    }

    this.updateScale(p, bands.lastDetected);

    p.background(0);
    let angle = 0;
    let angleStep = 180.0 / bands.numPoints;
    
    // p.fill(255, this.color, 0);
    p.beginShape(p.TRIANGLE_STRIP);
    for (let i = 0; i <= bands.numPoints; i++) {
      let px = this.x + p.cos(p.radians(angle)) * this.outsideRadius;
      let py = this.y + p.sin(p.radians(angle)) * this.outsideRadius;
      angle += angleStep;
      p.vertex(px, py);
      px = this.x + p.cos(p.radians(angle)) * this.insideRadius;
      py = this.y + p.sin(p.radians(angle)) * this.insideRadius;
      p.vertex(px, py);
      angle += angleStep;
    }
    p.endShape();
    this.updateColor(this.p, bands.lastDetected);
  }

  updateColor(p, c) {
    this.color = p.map(c, 0, 3, 0, 255);
    p.fill(255, this.color, 0);
  }

  updateScale(p, last) {
    this.scaleA = last + 0.04;
    this.scaleS = p.cos(this.scaleA) * 2;
    p.scale(this.scaleS);
  }
}

export default Rings;