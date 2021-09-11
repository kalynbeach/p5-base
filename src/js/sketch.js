/**
 * p5-base: some basics to get started (+ p5.js-sound)
**/

import { bandDetectorConfigs, bandEllipseConfigs } from './config.js';
import FrequencyBands from './frequencyBands.js';
import Rings from './visuals/Rings.js';

//
// Global Vars
//

let src; // Audio input source
let amp; // Audio amplitude analyzer
let bands; // Frequency bands
let rings; // Rings visuals

let userAudioStarted = false;
let fftAnalysis = true;
let fftBandVisuals = true;

let ringVisuals = true;


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

    rings = new Rings(p, {});

    if (ringVisuals) {
      console.log(`[ Closed Ring Sketch ]`);
      rings.setup(p, bands);
    }
  }


  //
  // Draw
  //
  p.draw = () => {
    p.background(0);
    p.fft.analyze();
    rings.draw(p, bands);
    if (rings && ringVisuals) {
      rings.draw(p, bands);
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