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
  circle(80, 200, 100*pctHours)

  fill(128, 128, 128)
  circle(200, 200, 100*pctMin )

  fill(220, 220, 220)
  circle(320, 200, 100*pctSec )
}