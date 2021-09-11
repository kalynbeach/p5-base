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
    this.numPoints = 3;
    this.lastDetected;
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
    for (let i = 0; i < this.detectors.length; i++) {
      this.detectors[i].onPeak(this.peakDetected.bind(this), i);
    }
  }


  initShapes() {
    for (const { x, y, color, label } of this.shapeConfigs) {
      let _bandShape = new BandEllipse(this.p, x, y, color, label);
      this.shapes.push(_bandShape);
    }
  }


  peakDetected(value, index) {
    this.lastDetected = index;

    // TODO: Build visual modules that take in value & index as args

    // Frequency band indexes
    switch (index) {
      case 0: // Sub
        // console.log(`** Sub: ${value}`);
        this.numPoints++;
        break;
      case 1: // Bass
        // console.log(`** Bass: ${value}`);
        this.numPoints++;
        break;
      case 2: // Low-Mid
        // console.log(`** Low-Mid: ${value}`);
        this.numPoints--;
        break;
      case 3: // Mid
        // console.log(`** Mid: ${value}`);
        // this.numPoints--;
        break; 
      default:
        break;
    }
  }
}

export default FrequencyBands;