/**
 * p5-base: some basics to get started (+ p5.js-sound)
**/


//
// Global Vars
//

let src; // Audio input source
let amp; // Audio amplitude analyzer


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
  src.start();
  amp.setInput(src);
}


//
// Draw
//

function draw() {
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
  userStartAudio();
}

function keyPressed(e) {
  // Key codes -> https://keycode.info/
  if (e.keyCode == 32) { // Spacebar
    console.log(`* Spacebar pressed!`);
  }
}