var orbitCenterX = 200;
var orbitCenterY = 200;
var orbitRadius = 150;

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



  // ************ A.M / P.M. ************

  if (now.am){
    noStroke()
    fill(110, 203, 255)
    rect(-200, -200, 400, 400)
  }else{
    noStroke()
    fill(0, 67, 76)
    rect(-200, -200, 400, 400)
  }



  // ************ DIAL PLATE ************

  let hr = now.hour
  let mn = now.min
  let sc = now.sec

  strokeWeight(5)
  noFill()

    // Hour
  if (now.year){
    if(now.season == 1){
      stroke(57, 181, 74, 150)
    }
    if(now.season == 2){
      stroke(251, 174, 255, 150)
    }
    if(now.season == 3){
      stroke(241, 90, 36, 150)
    }
    if(now.season == 4){
      stroke(153, 153, 153, 150)
    }
  let end1 = map(hr, 0, 12, 0, 360)
  arc(0, 0, 180, 180, 0, end1)
  }

    // Minute
  if (now.year){
    if(now.season == 1){
      stroke(57, 181, 74, 100)
    }
    if(now.season == 2){
      stroke(251, 174, 255, 100)
    }
    if(now.season == 3){
      stroke(241, 90, 36, 100)
    }
    if(now.season == 4){
      stroke(153, 153, 153, 100)
    }
  let end2 = map(mn, 0, 60, 0, 360)
  arc(0, 0, 215, 215, 0, end2)
  }

    //Second
  if (now.year){
    if(now.season == 1){
      stroke(57, 181, 74, 50)
    }
    if(now.season == 2){
      stroke(251, 174, 255, 50)
    }
    if(now.season == 3){
      stroke(241, 90, 36, 50)
    }
    if(now.season == 4){
      stroke(153, 153, 153, 50)
    }
  let end3 = map(sc, 0, 60, 0, 360)
  arc(0, 0, 250, 250, 0, end3)
}



  // ************ SEASON ************

    // Spring
  if (now.season == 1){
    noStroke()
    fill(57, 181, 74)
    ellipse(0, 0, 150, 150)
  }

    // Summer
  if (now.season == 2){
    noStroke()
    fill(251, 174, 255)
    ellipse(0, 0, 150, 150)
  }

    // Autumn
  if (now.season == 3){
    noStroke()
    fill(241, 90, 36)
    ellipse(0, 0, 150, 150)
  }

    // Winter
  if (now.season == 4){
    noStroke()
    fill(153, 153, 153)
    ellipse(0, 0, 150, 150)
  }

}