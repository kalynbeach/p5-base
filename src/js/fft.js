/**
 * FFT Analyzer: Detect audio frequency ranges
**/

let fft;

let src;
let srcLength;

let pg;

let playing = false;
let button;

let detectors = [];

let beats = [];