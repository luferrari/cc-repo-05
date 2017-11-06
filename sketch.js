var music, pie, sky, frequency, amplitude;

function preload() {
  pie = loadImage('./assets/pie.png')
  sky = loadImage('./assets/sky.png');
  music = loadSound('./assets/pie in the sky.mp3');
  // Music by HookSounds
  // see music-readme.txt for more info
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(45);
  angleMode(DEGREES);
  noFill();
  noStroke();

  // music.play([startTime],[rate],[amp],[loopStart],[duration]);
  music.loop(0.7, 1.16, 1, 0, 152);
  frequency = new p5.FFT();
  frequency.setInput(music);
  amplitude = new p5.Amplitude();
  amplitude.setInput(music);
}



function draw() {
  var co = 3;
  var si = 6;
  var cosine = si * width / (si * 10) * cos(frameCount % 360 * co - 90);
  var sine = co * width / (co * 30) * sin(frameCount % 360 * si - 22.5);
  var l = sqrt(width * height);

  background(28, 40, 38, 223);
  // sky
  ampGen();
  for (var s = -width / 2; s < width; s += height * 0.666) {
    image(sky, s, 0, height * 0.666, height * 0.666);
  }
  freqGen();

  // pie
  image(pie,
    cosine + width / 2 - width / 12,
    sine + height / 6 - height / 18,
    0.2 * sqrt(width * height), 0.2 * sqrt(width * height));
}



function ampGen() {
  var vol = amplitude.getLevel();
  amp = map(vol, 0, 0.9, 10, 250);

  for (var a = 1; a < 5; a++) {
    fill(218, 239, 179, 127 + 128 / a);
    ellipse(width * 0.9, width * 0.1, a * 62.5);
  }

  fill(238, 244, 212, 127);
  ellipse(width * 0.9, width * 0.1, amp * a * 0.25);
}



function freqGen() {
  var spectrum = frequency.analyze();
  var step = 1.25;

  noFill();
  push();
  scale(width / 1020, 1);

  for (f = 0; f < height * 0.75; f += step) {
    strokeWeight(step * 1.25);
    stroke(lerpColor(color(214, 69, 80, 223), color(234, 158, 141, 223), f / 350));

    push();
    translate(0, f * 1);
    beginShape();
    for (v = 0; v < spectrum.length; v += 20) {
      vertex(v, map(spectrum[v], 0, 255, height * 0.666, height * 0.25));
    }
    endShape();
    step *= 1.5;
    pop();
  }
  pop();
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// PALETTE
// dark gunmental      28, 40, 38
// english vermillion  214, 69, 80
// vivid tangerine     234, 158, 141
// tea green           218, 239, 179
// eggshell            238, 244, 212