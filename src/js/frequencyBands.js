/**
 * Audio Frequency Bands
 * -- Peak detection and visualization tools
**/

import BandEllipse from "./shapes/bandEllipse.js";


class FrequencyBands {

  constructor(p, detectorConfigs = {}, shapeConfigs = {}) {
    this.p = p; // p5 instance
    this.detectorConfigs = detectorConfigs;
    this.shapeConfigs = shapeConfigs;
    this.detectors = [];
    this.shapes = [];
    this.numPoints;
    this.initDetectors();
    this.initShapes();
    // console.log(`*** FrequencyBands initialized`);
    // console.log(`*** this.detectors: ${this.detectors}`);
    // console.log(`*** this.shapes: ${this.shapes}`);
  }

  initDetectors() {
    for (const { low, high, thresh, fpp } of this.detectorConfigs) {
      this.detectors.push(new p5.PeakDetect(low, high, thresh, fpp));
    }
    // Function defined here rather than a method to avoid
    // issues with `this` and the `.onPeak` callback
    const peakDetected = (value, index) => {
      // this.shapes[index].trigger(value);
      console.log(`peakDetected > index, value: ${value, index}`);

      // Sub frequency band
      if (index === 0) { this.numPoints++; }

      // TODO: Build out band -> numPoints behavior

      console.log(`this.numPoints: ${this.numPoints}`); 
    };
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