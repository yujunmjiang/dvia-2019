function setup() {
  // set the width & height of the sketch
  createCanvas(400, 400)

}

function draw(){
  // draw time use clock() function
  background(255)
  noStroke()

  var now = clock(),
      pctHours = now.progress.day;
      pctMin = now.progress.hour;
      pctSec = now.progress.min;

  fill(0, 0, 0)
  rect(20, 120, 360*pctHours, 40)

  fill(128, 128, 128)
  rect(20, 180, 360*pctMin,   40)

  fill(220, 220, 220)
  rect(20, 240, 360*pctSec,   40)
}
