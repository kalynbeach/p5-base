/**
 * p5-base: some basics to get started (+ p5.js-sound)
**/


//
// Global Vars
//

let src; // Audio input source
let amp; // Audio amplitude analyzer

let fftAnalysis = true;

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
}


//
// Draw
//

function draw() {
  if (fftAnalysis) {
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
  } else {
    // Simple ellipse placeholder demo
    noStroke();
    fill(0, 10);
    rect(0, 0, width, height);
    scale = map(amp.getLevel(), 0, 1.0, 10, width);
    fill(255);
    text('click to start', width/2.15, 30);
    ellipse(width/2, height/2, scale, scale);
  }
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