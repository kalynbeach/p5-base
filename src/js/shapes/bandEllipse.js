/**
 * Audio Frequency Band Ellipse Shape
 */

class BandEllipse {
  constructor(p, x, y, color, label) {
    this.p = p; // p5 instance
    this.x = x;
    this.y = y;
    this.size = 50;
    this.target = 0;
    this.color = color;
    this.label = label;
  }

  update() {
    this.p.noStroke();
    this.p.fill(this.color);
    let _size = this.size + this.target;
    this.p.ellipse(this.x, this.y, _size, _size);
    this.target *= 0.85;
  }

  trigger(value) {
    this.target = 100 * value;
  }
}

export default BandEllipse;