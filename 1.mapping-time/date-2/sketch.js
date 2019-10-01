var orbitCenterX = 200;
var orbitCenterY = 200;
var orbitRadius = 150;

function setup() {
  // set the width & height of the sketch
  createCanvas(400, 400)
}

function draw() {
  // draw time use clock() function
  background(0)
  noStroke()

  var now = clock()
  yearOR = map(now.progress.month, 0, 1, 0, 2 * Math.PI)

  var x = orbitCenterX + orbitRadius * cos(yearOR);
  var y = orbitCenterY + orbitRadius * sin(yearOR); 

    // Universe
  if (now.am){
      fill(255)
      rect(0, 0, 400, 400)
  }else{
      fill(0)
      rect(0, 0, 400, 400)
  }

    // Earth
    fill(0, 65, 127)
    ellipse(orbitCenterX, orbitCenterY, 150, 150)

    // Moon
    fill(251, 190, 23)
    ellipse(x, y, 40, 40)

    // Orbit
  if (now.season == 1){
    strokeWeight(2)
    noFill()
    stroke(57, 181, 74)
    arc(orbitCenterX, orbitCenterY, 200, 200, 0, 2 * Math.PI)
  }

  if (now.season == 2){
    strokeWeight(2)
    noFill()
    stroke(251, 174, 255)
    arc(orbitCenterX, orbitCenterY, 200, 200, 0, 2 * Math.PI)
  }

  if (now.season == 3){
    strokeWeight(2)
    noFill()
    stroke(241, 90, 36)
    arc(orbitCenterX, orbitCenterY, 200, 200, 0, 2 * Math.PI)
  }

  if (now.season == 4){
    strokeWeight(2)
    noFill()
    stroke(153, 153, 153)
    arc(orbitCenterX, orbitCenterY, 200, 200, 0, 2 * Math.PI)
  }
}