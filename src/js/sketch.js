/**
 * p5-base: some basics to get started (+ p5.js-sound)
**/


//
// Global Vars
//

let src; // Audio input source
let amp; // Audio amplitude analyzer

let fftAnalysis = true;
let fftBandVisuals = true;
let fftAmpVisuals = false;

let bandDetectors = [];
let bandEllipses = [];

// Audio Frequency Bands
const bandDetectorConfigs = [
  { low: 20, high: 60, thresh: 0.6, fpp: 30 }, // Sub
  { low: 60, high: 250, thresh: 0.6, fpp: 30 }, // Bass
  { low: 250, high: 500, thresh: 0.5, fpp: 30 }, // Low-Mid
  { low: 500, high: 2000, thresh: 0.35, fpp: 30 }, // Mid
  { low: 2000, high: 5000, thresh: 0.25, fpp: 30 }, // High-Mid
];

const bandEllipseConfigs = [
  { x: 250, y: 100 },
  { x: 350, y: 100 },
  { x: 450, y: 100 },
  { x: 550, y: 100 },
  { x: 650, y: 100 },
];

function detectedPeak(value, index) {
  console.log(`*** detectedPeak called: ${value}`);
  bandEllipses[index].trigger(value);
}

function initBandDetectors() {
  for (const { low, high, thresh, fpp } of bandDetectorConfigs) {
    bandDetectors.push(new p5.PeakDetect(low, high, thresh, fpp));
  }
  for (let i = 0; i < bandDetectors.length; i++) {
    bandDetectors[i].onPeak(detectedPeak, i);
  }
}

function initBandEllipses() {
  for (const bandEllipse of bandEllipseConfigs) {
    let _bandEllipse = new BandEllipse(bandEllipse.x, bandEllipse.y);
    bandEllipses.push(_bandEllipse);
  }
}

class BandEllipse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.target = 0;
  }

  update() {
    fill(255, 0, 0);
    let _size = this.size + this.target;
    ellipse(this.x, this.y, _size, _size);
    this.target *= 0.98;
  }

  trigger(value) {
    this.target = 100 * value;
  }
}

function drawBandEllipse() {

}

//
// Preload
//

function preload() {}


//
// Setup
//

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
  src = new p5.AudioIn();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  src.start();
  amp.setInput(src);
  fft.setInput(src);
  if (fftAnalysis && fftBandVisuals) {
    initBandDetectors();
    initBandEllipses();
    console.log(`*** bandDetectors: ${bandDetectors.length}`);
    console.dir(bandDetectors);
    console.log(`*** bandEllipses: ${bandEllipses.length}`);
    console.dir(bandEllipses);
  }
}


//
// Draw
//

function draw() {
  drawFFTBandVisuals();
}

function drawFFTBandVisuals() {
  background(180);
  fft.analyze();
  for (let i = 0; i < bandDetectors.length; i++) {
    bandDetectors[i].update(fft);
    bandEllipses[i].update();
  }
}

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
  text('click to start', 20, 20);
}

function drawPlaceholderEllipse() {
  // Simple ellipse placeholder demo
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);
  scale = map(amp.getLevel(), 0, 1.0, 10, width);
  fill(255);
  text('click to start', width/2.15, 30);
  ellipse(width/2, height/2, scale, scale);
}

//
// Input Handlers
//

function mousePressed() {
  console.log(`* Mouse clicked!`);
  userStartAudio();
}

function keyPressed(e) {
  // Key codes -> https://keycode.info/
  if (e.keyCode == 32) { // Spacebar
    console.log(`* Spacebar pressed!`);
  }
}