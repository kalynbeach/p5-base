/**
 * p5-base: some basics to get started (+ p5.js-sound)
**/

import { bandDetectorConfigs, bandEllipseConfigs } from './config.js';
import FrequencyBands from './frequencyBands.js';

//
// Global Vars
//

let src; // Audio input source
let amp; // Audio amplitude analyzer
let bands; // Frequency bands

let userAudioStarted = false;
let fftAnalysis = true;
let fftBandVisuals = true;

// Closed Ring Vars
let closedRingSketch = true;
let numPoints;
let x;
let y;
let outsideRadius = 150;
let insideRadius = 100;

function drawFFTAmpVisuals() {
  background(220);
  // Amplitude analysis along the frequency domain
  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }

  // Amplitude analysis along the time domain
  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
  text('(click to start)', 20, 20);
}

function drawPlaceholderEllipse() {
  // Simple ellipse placeholder demo
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);
  scale = map(amp.getLevel(), 0, 1.0, 10, width);
  fill(255);
  text('(click to start)', width/2.15, 30);
  ellipse(width/2, height/2, scale, scale);
}

function setupClosedRing(p, bands) {
  p.background(0);
  // numPoints = 1;
  bands.numPoints = 1;
  x = p.width / 2;
  y = p.height / 2;
}

// By Ira Greenberg - https://p5js.org/examples/form-triangle-strip.html
function drawClosedRing(p, bands) {
  for (let i = 0; i < bands.detectors.length; i++) {
    bands.detectors[i].update(p.fft);
  }
  p.background(0);
  let angle = 0;
  let angleStep = 180.0 / bands.numPoints;

  p.beginShape(p.TRIANGLE_STRIP);
  for (let i = 0; i <= bands.numPoints; i++) {
    let px = x + p.cos(p.radians(angle)) * outsideRadius;
    let py = y + p.sin(p.radians(angle)) * outsideRadius;
    angle += angleStep;
    p.vertex(px, py);
    px = x + p.cos(p.radians(angle)) * insideRadius;
    py = y + p.sin(p.radians(angle)) * insideRadius;
    p.vertex(px, py);
    angle += angleStep;
  }
  p.endShape();
}

function drawFrequencyBandEllipses(p, bands) {
  for (let i = 0; i < bands.detectors.length; i++) {
    bands.detectors[i].update(p.fft);
    bands.shapes[i].update();
  }
  p.fill(250);
  p.text('(click to start)', 20, 20);
}


export default function sketch(p) {

  //
  // Preload
  //
  p.preload = () => {}


  //
  // Setup
  //
  p.setup = () => {
    p.getAudioContext().suspend();
    p.createCanvas(p.windowWidth, p.windowHeight);

    src = new p5.AudioIn();
    amp = new p5.Amplitude();
    p.fft = new p5.FFT();
    src.start();
    amp.setInput(src);
    p.fft.setInput(src);
  
    bands = new FrequencyBands(p,
      bandDetectorConfigs,
      bandEllipseConfigs
    );

    if (closedRingSketch) {
      console.log(`[ Closed Ring Sketch ]`);
      setupClosedRing(p, bands);
    }
  }


  //
  // Draw
  //
  p.draw = () => {
    p.background(0);
    p.fft.analyze();
    if (closedRingSketch) {
      drawClosedRing(p, bands);
    } else {
      drawFrequencyBandEllipses(p, bands);
    }
  }


  //
  // Input Handlers
  //
  p.mousePressed = () => {
    console.log(`*** Mouse clicked!`);
    if (!userAudioStarted) {
      p.userStartAudio();
      console.log(`*** User Audio Started`);
      userAudioStarted = true;
    }
  }

  p.keyPressed = (e) => {
    // Key codes -> https://keycode.info/
    if (e.keyCode == 32) { // Spacebar
      console.log(`*** ${e.keyCode}: spacebar pressed!`);
    }
  }

}