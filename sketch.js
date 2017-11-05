var music, clouds, ground, frequency, amplitude;

function preload() {
  clouds = loadImage('./assets/clouds.png');
  ground = loadImage('./assets/ground.png');
  music = loadSound('./assets/pie in the sky.mp3');
  // Music by HookSounds
  // see music-readme.txt for more info
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(45);
  noFill();
  noStroke();

  music.play(.75);
  music.rate(1.08);
  frequency = new p5.FFT();
  frequency.setInput(music);
  amplitude = new p5.Amplitude();
  amplitude.setInput(music);
}

function draw() {
  background(28, 40, 38, 223);
  for (var s = 0; s < width; s += height * 0.666) {
    image(ground, s, height * 0.666, height * 0.666, height * 0.333);
  }
  ampGen();
  for (var g = 0; g < width; g += height * 0.666) {
    image(clouds, g, 0, height * 0.666, height * 0.666);
  }
  freqGen();

  var l = 0;
  if (!music.isPlaying()) {
    music.loop(1);
    l++;
    console.log(l);
  }
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
  var step = 1.5;

  noFill();
  push();
  scale(width / 1020, 1);

  for (f = 0; f < height * 0.75; f += step) {
    strokeWeight(step * 1.75);
    stroke(lerpColor(color(214, 69, 80, 191), color(234, 158, 141, 191), f / 350));

    push();
    translate(0, f * 1.25);
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