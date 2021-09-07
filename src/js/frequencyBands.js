/**
 * Audio Frequency Bands
 * -- Peak detection and visualization tools
**/

import BandEllipse from "./shapes/bandEllipse.js";


class FrequencyBands {
  constructor(p, detectorConfigs = {}, shapeConfigs = {}, detectors = [], shapes = []) {
    this.p = p; // p5 instance
    this.detectorConfigs = detectorConfigs;
    this.shapeConfigs = shapeConfigs;
    this.detectors = detectors;
    this.shapes = shapes;
    this.initDetectors();
    this.initShapes();
    console.log(`*** FrequencyBands initialized`);
    console.log(`*** this.detectors: ${this.detectors}`);
    console.log(`*** this.shapes: ${this.shapes}`);
  }

  initDetectors() {
    for (const { low, high, thresh, fpp } of this.detectorConfigs) {
      this.detectors.push(new p5.PeakDetect(low, high, thresh, fpp));
    }

    // Function defined here rather than a method to avoid
    // issues with `this` and the `.onPeak` callback
    const peakDetected = (value, index) => {
      this.shapes[index].trigger(value);
    }

    for (let i = 0; i < this.detectors.length; i++) {
      this.detectors[i].onPeak(peakDetected, i);
    }
  }

  initShapes() {
    for (const { x, y, color, label } of this.shapeConfigs) {
      let _bandShape = new BandEllipse(this.p, x, y, color, label);
      this.shapes.push(_bandShape);
    }
  }
}

export default FrequencyBands;