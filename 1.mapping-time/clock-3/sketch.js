function setup() {
  // set the width & height of the sketch
  createCanvas(400, 400)
  angleMode(DEGREES)

}

function draw() {
  // draw time use clock() function
  background(255)
  translate(200, 200)
  rotate(-90)

  var now = clock()

  let hr = now.hour
  let mn = now.min
  let sc = now.sec

  strokeWeight(20)
  noFill()
  stroke(0, 0, 0)
  let end1 = map(hr, 0, 12, 0, 360)
  arc(0, 0, 120, 120, 0, end1)

  stroke(128, 128, 128)
  let end2 = map(mn, 0, 60, 0, 360)
  arc(0, 0, 200, 200, 0, end2)

  stroke(220, 220, 220)
  let end3 = map(sc, 0, 60, 0, 360)
  arc(0, 0, 280, 280, 0, end3)

}